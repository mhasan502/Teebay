import graphene
from product.schema import Query as ProductQuery, Mutation as ProductMutation
from user.schema import Query as UserQuery, Mutation as UserMutation


class Query(UserQuery, ProductQuery, graphene.ObjectType):
    pass


class Mutation(UserMutation, ProductMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,)
