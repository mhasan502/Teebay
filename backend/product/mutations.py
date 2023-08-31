import graphene
from user.models import UserModel
from .models import ProductModel, CategoryModel, BuyRentalModel


class ProductInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    description = graphene.String(required=True)
    price = graphene.String(required=True)
    category = graphene.List(graphene.String)
    rent_type = graphene.String(required=True)
    rent_price = graphene.String(required=True)
    user_email = graphene.String()


class CreateProductMutation(graphene.Mutation):
    class Arguments:
        data = ProductInput(required=True)

    message = graphene.Field(graphene.String)

    @classmethod
    def mutate(cls, root, info, data):
        user = UserModel.objects.filter(email=data.user_email).first()
        categories = CategoryModel.objects.filter(category_name__in=data.category)
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

        message = "Product created successfully"
        return cls(message=message)


class EditProductMutation(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        data = ProductInput(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, id, data):
        user = UserModel.objects.filter(email=data.user_email).first()
        categories = CategoryModel.objects.filter(id__in=data.category)

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


class BuyProductMutation(graphene.Mutation):
    class Arguments:
        product_id = graphene.String(required=True)
        customer_email = graphene.String(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, product_id, email):
        product = ProductModel.objects.get(id=product_id)
        if product in BuyRentalModel.objects.filter(product=product, is_bought=True).first():
            message = "Product already bought"
        else:
            customer = UserModel.objects.get(email=email)
            buy_rental = BuyRentalModel.objects.create(
                product=product,
                customer=customer,
                is_bought=True
            )
            buy_rental.save()
            message = "Product bought successfully"

        return cls(message=message)


class RentProductMutation(graphene.Mutation):
    class Arguments:
        product_id = graphene.String(required=True)
        customer_email = graphene.String(required=True)
        date_from = graphene.String(required=True)
        date_to = graphene.String(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, product_id, email, date_from, date_to):
        product = ProductModel.objects.get(id=product_id)
        if product in BuyRentalModel.objects.filter(product=product, is_rented=True).first():
            message = "Product already rented"
        else:
            customer = UserModel.objects.get(email=email)
            buy_rental = BuyRentalModel.objects.create(
                product=product,
                customer=customer,
                date_from=date_from,
                date_to=date_to,
                is_rented=True
            )
            buy_rental.save()
            message = "Product rented successfully"

        return cls(message=message)


class Mutation(graphene.ObjectType):
    create_product = CreateProductMutation.Field()
    edit_product = EditProductMutation.Field()
    delete_product = DeleteProductMutation.Field()

    buy_product = BuyProductMutation.Field()
    rent_product = RentProductMutation.Field()
