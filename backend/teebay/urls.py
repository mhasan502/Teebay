from django.urls import path, include


urlpatterns = [
    path("api/user/", include('user.urls'), name="user"),
    path("api/product/", include('product.urls'), name="product"),


]
