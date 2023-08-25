import graphene
from graphene_django import DjangoObjectType
from .models import ProductModel, CategoryModel


class ProductType(DjangoObjectType):
    class Meta:
        model = ProductModel
        fields = "__all__"


class CategoryType(DjangoObjectType):
    class Meta:
        model = CategoryModel
        fields = "__all__"


class CombinedProductCategoryType(ProductType, CategoryType, DjangoObjectType):

    class Meta:
        model = ProductModel
        fields = "__all__"
