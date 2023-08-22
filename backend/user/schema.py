import graphene
from graphene_django import DjangoObjectType
from .models import UserModel
from .mutations import LoginMutation


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        exclude = ("password",)


class Query(graphene.ObjectType):
    all_user = graphene.List(UserType)
    user = graphene.Field(UserType, email=graphene.String(required=True))

    sign_up = graphene.Field(
        UserType,
        first_name=graphene.String(required=True),
        last_name=graphene.String(required=True),
        address=graphene.String(required=True),
        email=graphene.String(required=True),
        phone=graphene.String(required=True),
        password=graphene.String(required=True),
    )

    def resolve_all_user(self):
        return UserModel.objects.all()

    def resolve_user(self, args):
        email = args["email"]
        return UserModel.objects.get(email=email)

    def resolve_sign_up(self, info):
        first_name = info["first_name"]
        last_name = info["last_name"]
        address = info["address"]
        email = info["email"]
        phone = info["phone"]
        password = info["password"]

        user = UserModel(
            first_name=first_name,
            last_name=last_name,
            address=address,
            email=email,
            phone=phone,
            password=password,
        )
        user.save()
        return user


class Mutation(graphene.ObjectType):
    login = LoginMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
