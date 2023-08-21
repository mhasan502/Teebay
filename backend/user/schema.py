import graphene
from graphene_django import DjangoObjectType
from .models import UserModel


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        exclude = ("password",)


class Query(graphene.ObjectType):
    all_user = graphene.List(UserType)
    user = graphene.Field(UserType, email=graphene.String(required=True))

    def resolve_all_user(self, info):
        return UserModel.objects.all()

    def resolve_user(self, info, email):
        return UserModel.objects.get(email=email)


schema = graphene.Schema(query=Query)
