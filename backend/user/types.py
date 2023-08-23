from graphene_django import DjangoObjectType
from user.models import UserModel


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        exclude = ("password",)
