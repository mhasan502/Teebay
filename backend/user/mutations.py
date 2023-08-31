import jwt
import decouple
import graphene
from django.core.exceptions import ValidationError
from .models import UserModel


class SignInInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class SignInMutation(graphene.Mutation):
    class Arguments:
        data = SignInInput(required=True)

    token = graphene.String()
    email = graphene.String()

    @classmethod
    def mutate(cls, root, info, data):
        user = UserModel.objects.filter(email=data.email, password=data.password).first()

        if user is None:
            raise ValidationError('Invalid email address')

        if user.password != data.password:
            raise ValidationError('Invalid password')

        token = jwt.encode(
            {'user_id': (user.email + user.password)},
            key=decouple.config("SECRET_KEY"),
            algorithm='HS256'
        )

        return cls(token=token, email=user.email)


class SignUpInput(graphene.InputObjectType):
    sign_in_input = SignInInput(required=True)
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    address = graphene.String(required=True)
    phone = graphene.String(required=True)


class SignUpMutation(graphene.Mutation):
    class Arguments:
        data = SignUpInput(required=True)

    token = graphene.String()
    email = graphene.String()

    @classmethod
    def mutate(cls, root, info, data):
        user = UserModel.objects.filter(email=data.sign_in_input.email).first()

        if user is not None:
            raise ValidationError('Email address already exists')

        user = UserModel.objects.create(
            email=data.sign_in_input.email,
            password=data.sign_in_input.password,
            first_name=data.first_name,
            last_name=data.last_name,
            address=data.address,
            phone=data.phone
        )

        token = jwt.encode(
            {'user_id': (user.email + user.password)},
            key=decouple.config("SECRET_KEY"),
            algorithm='HS256'
        )

        return cls(token=token, email=user.email)


class Mutation(graphene.ObjectType):
    sign_in = SignInMutation.Field()
    sign_up = SignUpMutation.Field()
