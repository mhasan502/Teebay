import graphene
from .models import UserModel
from .types import UserType


class Query(graphene.ObjectType):
    """
    Class for all queries
    """
    all_user = graphene.List(UserType)
    user = graphene.Field(UserType, email=graphene.String(required=True))

    def resolve_all_user(self, info):
        """
        Return all users
        """
        return UserModel.objects.all()

    def resolve_user(self, info, email):
        """
        Return specific user by given email
        """
        return UserModel.objects.get(email=email)
