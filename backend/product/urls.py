from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema as product_schema


urlpatterns = [
    path('', GraphQLView.as_view(graphiql=True, schema=product_schema)),
]
