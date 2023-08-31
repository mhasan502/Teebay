import graphene
from .models import ProductModel, CategoryModel, RENT_CHOICES, BuyRentalModel
from .types import CategoryType, CombinedProductCategoryType


class Query(graphene.ObjectType):
    product = graphene.Field(CombinedProductCategoryType, id=graphene.Int(required=True))
    all_product_created_by_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))

    all_category_types = graphene.List(CategoryType)
    all_rent_types = graphene.List(graphene.List(graphene.String))
    all_products = graphene.List(CombinedProductCategoryType)

    sold_products_for_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))
    bought_products_for_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))
    lent_products_for_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))
    burrowed_products_for_customer = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))

    def resolve_product(self, info, id):
        return ProductModel.objects.get(id=id)

    def resolve_all_product_created_by_user(self, info, email):
        return ProductModel.objects.filter(owner__email=email)

    def resolve_all_category_types(self, info):
        return CategoryModel.objects.all()

    def resolve_all_rent_types(self, info):
        return [[rent, rent] for rent, _ in RENT_CHOICES]

    def resolve_all_products(self, info):
        return ProductModel.objects.all()

    def resolve_sold_products_for_user(self, info, email):
        return BuyRentalModel.objects.filter(is_bought=True, product__owner__email=email)

    def resolve_bought_products_for_user(self, info, email):
        return BuyRentalModel.objects.filter(is_bought=True, customer__email=email)

    def resolve_lent_products_for_user(self, info, email):
        return BuyRentalModel.objects.filter(is_rented=True, product__owner__email=email)

    def resolve_burrowed_products_for_customer(self, info, email):
        return BuyRentalModel.objects.filter(is_rented=True, customer__email=email)
