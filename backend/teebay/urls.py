from django.urls import path, include
from graphene_django.views import GraphQLView


urlpatterns = [
    path("user/", include('user.urls'), name="user"),
    path("product/", include('product.urls'), name="product"),

    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
