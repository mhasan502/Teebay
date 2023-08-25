import graphene
from user.models import UserModel
from .models import ProductModel, CategoryModel, RENT_CHOICES
from .types import ProductType, CategoryType, CombinedProductCategoryType
from .mutations import CreateProductMutation, EditProductMutation, DeleteProductMutation


class Query(graphene.ObjectType):
    product = graphene.Field(CombinedProductCategoryType, id=graphene.Int(required=True))
    all_product_created_by_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))

    all_category_types = graphene.List(CategoryType)
    all_rent_types = graphene.List(graphene.String)

    def resolve_product(self, info, id):
        return ProductModel.objects.get(id=id)

    def resolve_all_product_created_by_user(self, info, email):
        user = UserModel.objects.get(email=email)
        return ProductModel.objects.filter(owner=user)

    def resolve_all_category_types(self, info):
        return CategoryModel.objects.all()

    def resolve_all_rent_types(self, info):
        return [rent for rent, _ in RENT_CHOICES]


class Mutation(graphene.ObjectType):
    create_product = CreateProductMutation.Field()
    edit_product = EditProductMutation.Field()
    delete_product = DeleteProductMutation.Field()