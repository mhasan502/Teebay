import graphene
from graphene_django import DjangoObjectType
from .models import ProductModel, CategoryModel, RentModel
from user.models import UserModel


class CategoryType(DjangoObjectType):
    class Meta:
        model = CategoryModel
        fields = "__all__"


class RentType(DjangoObjectType):
    class Meta:
        model = RentModel
        fields = "__all__"


class ProductType(DjangoObjectType):
    class Meta:
        model = ProductModel
        fields = "__all__"


class Query(graphene.ObjectType):
    product = graphene.Field(ProductType, id=graphene.Int(required=True))
    all_product_created_by_user = graphene.List(ProductType)

    all_category = graphene.List(CategoryType)
    category = graphene.Field(CategoryType, id=graphene.Int(required=True))

    def resolve_product(self, info, id_):
        return ProductModel.objects.get(id=id_)

    def resolve_all_product_created_by_user(self, info, email):
        user = UserModel.objects.get(email=email)
        return ProductModel.objects.filter(user=user)

    def resolve_all_category(self, info):
        return CategoryModel.objects.all()

    def resolve_category(self, info, category_name):
        return CategoryModel.objects.get(category_name=category_name)


schema = graphene.Schema(query=Query)
