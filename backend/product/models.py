from django.db import models
from user.models import UserModel


class CategoryModel(models.Model):
    """
    Category model for storing category names
    """
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name


RENT_CHOICES = [
    ('Hourly', 'Hourly'),
    ('Daily', 'Daily')
]


class ProductModel(models.Model):
    """
    Product model for storing product data
    """

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    category = models.ManyToManyField(CategoryModel, related_name='category')

    rent_type = models.CharField(max_length=10, choices=RENT_CHOICES)
    rent_price = models.DecimalField(max_digits=10, decimal_places=2)

    owner = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    date_posted = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_posted']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return self.title


class BuyRentalModel(models.Model):
    """
    Buy and Rental model for storing rental and buy data
    """

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    customer = models.ForeignKey(UserModel, on_delete=models.CASCADE)

    date_from = models.DateField(blank=True, null=True)
    date_to = models.DateField(blank=True, null=True)

    is_rented = models.BooleanField(default=False)
    is_bought = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_from']
        verbose_name = 'Buy and Rental'
        verbose_name_plural = 'Buy and Rentals'

    def __str__(self):
        if self.is_bought:
            return f'{self.product.title} (Bought)'
        elif self.is_rented:
            return f'{self.product.title} ({self.date_from} - {self.date_to})'
