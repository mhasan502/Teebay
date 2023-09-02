from graphene.test import Client
from django.test import TestCase
from teebay.schema import schema
from .models import ProductModel, CategoryModel, BuyRentalModel
from user.models import UserModel

GraphQL_Client = Client(schema=schema)


class QueryTest(TestCase):

    def setUp(self):
        user = UserModel.objects.create(
            email='test@example.com',
            password='password',
            first_name='Test',
            last_name='User',
            address='123 Main Street',
            phone='1234567890'
        )
        self.product_1 = ProductModel.objects.create(
            title="Product 1",
            description="This is product 1.",
            price=100,
            rent_price=50,
            owner=user,
        )
        self.product_2 = ProductModel.objects.create(
            title="Product 2",
            description="This is product 2.",
            price=200,
            rent_price=100,
            owner=user,
        )
        self.category_1 = CategoryModel.objects.create(category_name="Category 1")
        self.category_2 = CategoryModel.objects.create(category_name="Category 2")
        self.product_1.category.add(self.category_1)
        self.product_2.category.add(self.category_2)

    def test_product(self):
        response = GraphQL_Client.execute(
            'query { product(id: 5) { id title description price rentPrice category { categoryName }}}'
        )
        response = response['data']['product']
        self.assertEqual(response["id"], str(self.product_1.id))
        self.assertEqual(response["title"], self.product_1.title)
        self.assertEqual(response["description"], self.product_1.description)
        self.assertEqual(response["price"], "{:.2f}".format(self.product_1.price))
        self.assertEqual(response["rentPrice"], "{:.2f}".format(self.product_1.rent_price))
        self.assertEqual(response["category"][0]["categoryName"], self.category_1.category_name)

    def test_all_product_created_by_user(self):
        response = GraphQL_Client.execute(
            'query { allProductCreatedByUser(email: "test@example.com") '
            '{ id title description price rentPrice category { categoryName }}}'
        )
        response = response['data']["allProductCreatedByUser"]
        self.assertEqual(len(response), 2)
        self.assertEqual(response[-2]["id"], str(self.product_1.id))
        self.assertEqual(response[-2]["title"], self.product_1.title)
        self.assertEqual(response[-2]["description"], self.product_1.description)
        self.assertEqual(response[-2]["price"], "{:.2f}".format(self.product_1.price))
        self.assertEqual(response[-2]["rentPrice"], "{:.2f}".format(self.product_1.rent_price))
        self.assertEqual(response[-2]["category"][0]["categoryName"], self.category_1.category_name)
        self.assertEqual(response[-1]["id"], str(self.product_2.id))
        self.assertEqual(response[-1]["title"], self.product_2.title)
        self.assertEqual(response[-1]["description"], self.product_2.description)
        self.assertEqual(response[-1]["price"], "{:.2f}".format(self.product_2.price))
        self.assertEqual(response[-1]["rentPrice"], "{:.2f}".format(self.product_2.rent_price))
        self.assertEqual(response[-1]["category"][0]["categoryName"], self.category_2.category_name)

    def test_all_category_types(self):
        response = GraphQL_Client.execute('query { allCategoryTypes { categoryName } }')
        response = response['data']["allCategoryTypes"]

        self.assertEqual(response[-2]["categoryName"], self.category_1.category_name)
        self.assertEqual(response[-1]["categoryName"], self.category_2.category_name)
