import graphene

from user.models import UserModel
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
    borrowed_products_for_user = graphene.List(CombinedProductCategoryType, email=graphene.String(required=True))

    def resolve_product(self, info, id):
        """
        Return specific product by given id
        """
        return ProductModel.objects.get(id=id)

    def resolve_all_product_created_by_user(self, info, email):
        """
        Return all products created by user
        """
        return ProductModel.objects.filter(owner__email=email)

    def resolve_all_category_types(self, info):
        """
        Return all category types
        """
        return CategoryModel.objects.all()

    def resolve_all_rent_types(self, info):
        """
        Return all rent types
        """
        return [[rent, rent] for rent, _ in RENT_CHOICES]

    def resolve_all_products(self, info):
        """
        Return product which is not bought in BuyRentalModel
        """
        already_bought_products = list(BuyRentalModel.objects.filter(is_bought=True).values_list("product", flat=True))
        return ProductModel.objects.all().exclude(id__in=already_bought_products)

    def resolve_sold_products_for_user(self, info, email):
        """
        Return all sold products for user by email
        """
        return [data.product for data in BuyRentalModel.objects.filter(is_bought=True, product__owner__email=email)]

    def resolve_bought_products_for_user(self, info, email):
        """
        Return all bought products for user by email
        """
        return [data.product for data in BuyRentalModel.objects.filter(is_bought=True, customer__email=email)]

    def resolve_lent_products_for_user(self, info, email):
        """
        Return all lent products for user by email
        """
        rented_products = BuyRentalModel.objects.filter(is_rented=True).values_list("product", flat=True)
        return ProductModel.objects.filter(id__in=rented_products, owner__email=email)

    def resolve_borrowed_products_for_user(self, info, email):
        """
        Return all borrowed products for user by email
        """
        return [data.product for data in BuyRentalModel.objects.filter(is_rented=True, customer__email=email)]
