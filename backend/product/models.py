from django.db import models
from user.models import UserModel


class CategoryModel(models.Model):
    """
    Category model for storing category data
    """
    category_choices = (
        ('Electronics', 'ELECTRONICS'),
        ('Furniture', 'FURNITURE'),
        ('Home Appliances', 'HOME APPLIANCES'),
        ('Sporting Goods', 'SPORTING GOODS'),
        ('Outdoor', 'OUTDOOR'),
        ('Toys', 'TOYS'),
    )
    category_name = models.CharField(choices=category_choices)

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class RentModel(models.Model):
    """
    Rent model for storing rent data
    """
    rent_choices = (
        ('per hour', 'Hourly'),
        ('per day', 'Daily'),
    )
    rent_type = models.CharField(choices=rent_choices)
    rent_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.rent_type

    class Meta:
        verbose_name = 'Rent'
        verbose_name_plural = 'Rents'


class ProductModel(models.Model):
    """
    Product model for storing product data
    """
    title = models.CharField(max_length=200)
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rent = models.ForeignKey(RentModel, on_delete=models.CASCADE)
    owner = models.ForeignKey(UserModel, on_delete=models.CASCADE)
