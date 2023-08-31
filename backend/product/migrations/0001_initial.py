from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("user", "__first__"),
    ]

    def populate_category_table(self, schema_editor):
        CategoryModel = self.get_model("product", "CategoryModel")
        category_list = [
            "ELECTRONICS",
            "FURNITURE",
            "HOME APPLIANCES",
            "SPORTING GOODS",
            "OUTDOOR",
            "TOYS",
        ]
        for category in category_list:
            CategoryModel.objects.create(category_name=category)

    def populate_product_table(self, schema_editor):
        ProductModel = self.get_model("product", "ProductModel")
        CategoryModel = self.get_model("product", "CategoryModel")
        UserModel = self.get_model("user", "UserModel")

        product_list = [
            {
                "title": "Apple iPhone 11 Pro Max",
                "description": "The iPhone 11 Pro Max is the best that Apple can cram into a smartphone - the "
                               "high-end screen, powerful speakers, upgraded processor all support the huge upgrades "
                               "to the camera. However, those upgrades don't quite warrant the huge price leap over "
                               "the iPhone 11 Pro.",
                "price": 1099.00,
                "rent_type": "Daily",
                "rent_price": 10.00,
                "category": [CategoryModel.objects.get(category_name="ELECTRONICS")],
                "owner": UserModel.objects.get(id=1),
            },
            {
                "title": "Samsung Galaxy S20 Ultra",
                "description": "The Samsung Galaxy S20 Ultra is a beast of a phone with a 6.9-inch 120Hz display, "
                               "a 108MP camera with super-long zoom and 5G standard, but its hard to justify the "
                               "price tag.",
                "price": 1399.00,
                "rent_type": "Daily",
                "rent_price": 10.00,
                "category": [CategoryModel.objects.get(category_name="ELECTRONICS")],
                "owner": UserModel.objects.get(id=2),
            },
            {
                "title": "Plastic Chair",
                "description": "Plastic Chair",
                "price": 10.00,
                "rent_type": "Daily",
                "rent_price": 1.00,
                "category": [CategoryModel.objects.get(category_name="FURNITURE")],
                "owner": UserModel.objects.get(id=1),
            },
            {
                "title": "Flamingo Toys",
                "description": "Flamingo Toys",
                "price": 10.00,
                "rent_type": "Daily",
                "rent_price": 1.00,
                "category": [CategoryModel.objects.get(category_name="TOYS")],
                "owner": UserModel.objects.get(id=1),
            },
        ]
        for product in product_list:
            p = ProductModel.objects.create(
                title=product["title"],
                description=product["description"],
                price=product["price"],
                rent_type=product["rent_type"],
                rent_price=product["rent_price"],
                owner=product["owner"],
            )
            p.category.set(product["category"])
            p.save()

    operations = [
        migrations.CreateModel(
            name="CategoryModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID", ),),
                ("category_name", models.CharField(max_length=100)),
            ],
        ),

        migrations.CreateModel(
            name="ProductModel",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(max_length=500)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "rent_type",
                    models.CharField(
                        choices=[("Hourly", "Hourly"), ("Daily", "Daily")],
                        max_length=10,
                    ),
                ),
                ("rent_price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("date_posted", models.DateTimeField(auto_now_add=True)),
                (
                    "category",
                    models.ManyToManyField(
                        related_name="category", to="product.categorymodel"
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="user.usermodel"
                    ),
                ),
            ],
            options={
                "verbose_name": "Product",
                "verbose_name_plural": "Products",
                "ordering": ["-date_posted"],
            },
        ),

        migrations.CreateModel(
            name="BuyRentalModel",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("date_from", models.DateTimeField(blank=True)),
                ("date_to", models.DateTimeField(blank=True, null=True)),
                ("is_rented", models.BooleanField(default=False)),
                ("is_bought", models.BooleanField(default=False)),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="user.usermodel"
                    ),
                ),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="product.productmodel",
                    ),
                ),
            ],
            options={
                "verbose_name": "Buy and Rental",
                "verbose_name_plural": "Buy and Rentals",
                "ordering": ["-date_from"],
            },
        ),

        migrations.RunPython(
            code=populate_category_table
        ),
        migrations.RunPython(
            code=populate_product_table
        ),
    ]
