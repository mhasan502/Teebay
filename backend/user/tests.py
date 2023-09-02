import jwt
import decouple
from graphene.test import Client
from django.test import TestCase
from teebay.schema import schema
from .models import UserModel


GraphQL_Client = Client(schema=schema)


class TestQuery(TestCase):

    def test_all_user(self):
        UserModel.objects.create(
            email='test@example.com',
            password='password',
            first_name='Test',
            last_name='User',
            address='123 Main Street',
            phone='1234567890'
        )
        UserModel(email='user2@example.com').save()

        result = GraphQL_Client.execute('query { allUser { email } }')
        self.assertEqual(
            result['data']['allUser'][-2:], [{'email': 'test@example.com'}, {'email': 'user2@example.com'}, ]
        )

    def test_user(self):
        user = UserModel(email='user@example.com')
        user.save()

        result = GraphQL_Client.execute('query { user(email:"user@example.com") { id email } }')
        self.assertEqual(result['data']['user'], {
            'id': str(user.id),
            'email': user.email,
        })


class TestSignInMutation(TestCase):

    def setUp(self):
        self.user = UserModel.objects.create(
            email='test@example.com',
            password='password',
            first_name='Test',
            last_name='User',
            address='123 Main Street',
            phone='1234567890'
        )

    def test_valid_sign_in(self):
        result = GraphQL_Client.execute(
            'mutation { signIn(data: {email:"test@example.com", password:"password"}){ token email } }'
        )

        result = result['data']['signIn']

        self.assertEqual(result['token'], jwt.encode(
            {'user_id': (self.user.email + self.user.password)},
            key=decouple.config("SECRET_KEY"),
            algorithm='HS256'
        ))

        self.assertEqual(result['email'], self.user.email)

    def test_invalid_email(self):
        result = GraphQL_Client.execute(
            'mutation { signIn(data: {email:"invalid_email", password:"password"}){ token email } }'
        )

        self.assertEqual(result['errors'][0]['message'], 'Invalid email address')


class SignUpMutationTest(TestCase):

    def test_valid_sign_up(self):
        data = {
            'sign_in_input': {
                'email': 'test2@example.com',
                'password': 'password',
            },
            'first_name': 'Test',
            'last_name': 'User',
            'address': '123 Main Street',
            'phone': '1234567890',
        }

        result = GraphQL_Client.execute(
            'mutation { signUp(data: {signInInput: {'
            'email: "test2@example.com", password: "password"}, '
            'firstName: "Test", lastName: "User", address: "123 Main Street", phone: "1234567890"}) { email token } }'
        )
        result = result['data']['signUp']

        self.assertEqual(result['token'], jwt.encode(
            {'user_id': (data['sign_in_input']['email'] + data['sign_in_input']['password'])},
            key=decouple.config("SECRET_KEY"),
            algorithm='HS256'
        ))
        self.assertEqual(result['email'], data['sign_in_input']['email'])

        user = UserModel.objects.get(email=data['sign_in_input']['email'])

        self.assertEqual(user.first_name, data['first_name'])
        self.assertEqual(user.last_name, data['last_name'])
        self.assertEqual(user.address, data['address'])
        self.assertEqual(user.phone, data['phone'])

    def test_email_already_exists(self):
        GraphQL_Client.execute(
            'mutation { signUp(data: {signInInput: {'
            'email: "test2@example.com", password: "password"}, '
            'firstName: "Test", lastName: "User", address: "123 Main Street", phone: "1234567890"}) { email token } }'
        )
        result = GraphQL_Client.execute(
            'mutation { signUp(data: {signInInput: {'
            'email: "test2@example.com", password: "password"}, '
            'firstName: "Test", lastName: "User", address: "123 Main Street", phone: "1234567890"}) { email token } }'
        )

        self.assertEqual(result['errors'][0]['message'], 'Email address already exists')
