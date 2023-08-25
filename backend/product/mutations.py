import graphene
from user.models import UserModel
from .models import ProductModel, CategoryModel
from .types import ProductType


class ProductInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    description = graphene.String(required=True)
    price = graphene.Decimal(required=True)
    category = graphene.String(required=True)
    rent_type = graphene.String(required=True)
    rent_price = graphene.Decimal(required=True)
    user_email = graphene.String(required=True)


class CreateProductMutation(graphene.Mutation):
    class Arguments:
        data = ProductInput(required=True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls, root, info, data):
        user = UserModel.objects.filter(email=data.user_email).first()
        categories = CategoryModel.objects.filter(category_name=data.category)

        product = ProductModel.objects.create(
            title=data.title,
            description=data.description,
            price=data.price,
            rent_type=data.rent_type,
            rent_price=data.rent_price,
            owner=user
        )
        product.category.set(categories)
        product.save()

        return cls(product=product)


class EditProductMutation(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        data = ProductInput(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, id, data):
        user = UserModel.objects.filter(email=data.user_email).first()
        categories = CategoryModel.objects.filter(category_name=data.category)

        product = ProductModel.objects.get(id=id)
        product.title = data.title
        product.description = data.description
        product.price = data.price
        product.rent_type = data.rent_type
        product.rent_price = data.rent_price
        product.owner = user
        product.category.set(categories)
        product.save()

        message = "Product updated successfully"
        return cls(message=message)


class DeleteProductMutation(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, id):
        product = ProductModel.objects.get(id=id)
        product.delete()

        message = "Product deleted successfully"
        return cls(message=message)
