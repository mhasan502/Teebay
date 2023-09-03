from datetime import date, datetime, timedelta
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
    """
    Create product mutation by given data of ProductInput
    Return message
    """

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
    """
    Edit product mutation by given id and data of ProductInput
    Return message
    """

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
    """
    Delete product mutation by given id
    Return message
    """

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
    """
    Buy product mutation by given product_id and customer_email
    Return message
    """

    class Arguments:
        product_id = graphene.String(required=True)
        customer_email = graphene.String(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, product_id, customer_email):
        product = ProductModel.objects.get(id=product_id)
        if BuyRentalModel.objects.filter(product=product, is_bought=True).exists():
            message = "Product already bought"
        else:
            customer = UserModel.objects.get(email=customer_email)
            buy_rental = BuyRentalModel.objects.create(
                product=product,
                customer=customer,
                is_bought=True
            )
            buy_rental.save()
            message = "Product bought successfully"

        return cls(message=message)


class RentProductMutation(graphene.Mutation):
    """
    Rent product mutation by given product_id, customer_email, date_from and date_to
    Return message
    """

    class Arguments:
        product_id = graphene.String(required=True)
        customer_email = graphene.String(required=True)
        date_from = graphene.String(required=True)
        date_to = graphene.String(required=True)

    message = graphene.String()

    @classmethod
    def mutate(cls, root, info, product_id, customer_email, date_from, date_to):
        def generate_date_range(start_date, end_date):
            list_of_dates = []
            for n in range(int((end_date - start_date).days) + 1):
                list_of_dates.append(start_date + timedelta(n))
            return list_of_dates

        product = ProductModel.objects.get(id=product_id)
        date_from = datetime.strptime(date_from, '%Y-%m-%d').date()
        date_to = datetime.strptime(date_to, '%Y-%m-%d').date()

        existing_product = BuyRentalModel.objects.filter(product=product, is_rented=True)
        if existing_product.exists():
            rented_dates = existing_product.values_list("date_from", "date_to")
            reserved_dates = generate_date_range(rented_dates[0][0], rented_dates[0][1])
            if date_from in reserved_dates or date_to in reserved_dates:
                message = f"Product already rented from {date_from} to {date_to}"
                return cls(message=message)

        customer = UserModel.objects.get(email=customer_email)
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
    """
    Mutation class for all product mutations
    """
    create_product = CreateProductMutation.Field()
    edit_product = EditProductMutation.Field()
    delete_product = DeleteProductMutation.Field()

    buy_product = BuyProductMutation.Field()
    rent_product = RentProductMutation.Field()
