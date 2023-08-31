import graphene
from product.queries import Query as ProductQuery
from product.mutations import Mutation as ProductMutation
from user.queries import Query as UserQuery
from user.mutations import Mutation as UserMutation


class Query(UserQuery, ProductQuery, graphene.ObjectType):
    pass


class Mutation(UserMutation, ProductMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,)
