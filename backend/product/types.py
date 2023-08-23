from graphene_django import DjangoObjectType
from .models import ProductModel


class ProductType(DjangoObjectType):
    class Meta:
        model = ProductModel
        fields = "__all__"
