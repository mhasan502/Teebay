import graphene
from .models import UserModel
from .types import UserType


class Query(graphene.ObjectType):
    all_user = graphene.List(UserType)
    user = graphene.Field(UserType, email=graphene.String(required=True))

    def resolve_all_user(self, info):
        return UserModel.objects.all()

    def resolve_user(self, info, email):
        return UserModel.objects.get(email=email)
