from django.db import models


class User(models.Model):
    """
    User model for storing user data
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=128)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
