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
            "Electronics",
            "Furniture",
            "Home Appliances",
            "Sporting Goods",
            "Outdoor",
            "Toys",
        ]
        for category in category_list:
            CategoryModel.objects.create(category_name=category)

    def populate_product_table(self, schema_editor):
        ProductModel = self.get_model("product", "ProductModel")
        CategoryModel = self.get_model("product", "CategoryModel")
        UserModel = self.get_model("user", "UserModel")

        product_list = [
            {
                "title": "Apple iPhone 14 Pro Max",
                "description": "The iPhone 14 and iPhone 14 Plus were released in September 2022. They have a "
                               "6.1-inch and 6.7-inch Super Retina XDR display, respectively, with a resolution of "
                               "2532 x 1170 pixels. They are powered by the A15 Bionic chip and have 6GB of RAM. The "
                               "rear camera system is 12MP dual-camera, while the front camera is 12MP. They come in "
                               "128GB, 256GB, and 512GB storage capacities. The main difference between the iPhone 14 "
                               "and iPhone 14 Plus is the size. The iPhone 14 is smaller and lighter, "
                               "while the iPhone 14 Plus is larger and has a longer battery life.",
                "price": 1099.00,
                "rent_type": "Daily",
                "rent_price": 10.00,
                "category": [CategoryModel.objects.get(category_name="Electronics")],
                "owner": UserModel.objects.get(id=1),
            },
            {
                "title": "Samsung Galaxy S23 Ultra",
                "description": "The Samsung Galaxy S23 Ultra is a high-end smartphone that offers a lot of features "
                               "and performance. It has a large, high-resolution display, a powerful processor, "
                               "and a versatile camera system. It is also water and dust resistant, making it durable "
                               "for everyday use. The Galaxy S23 Ultra is priced starting at $1199.99 in the United "
                               "States. It is available for purchase from Samsung and major retailers.",
                "price": 1199.00,
                "rent_type": "Daily",
                "rent_price": 19.00,
                "category": [CategoryModel.objects.get(category_name="Electronics")],
                "owner": UserModel.objects.get(id=2),
            },
            {
                "title": "Plastic Chair",
                "description": "A chair is a type of seat, typically designed for one person and consisting of one or "
                               "more legs, a flat or slightly angled seat and a back-rest. They may be made of wood, "
                               "metal, or synthetic materials, and may be padded or upholstered in various colors and "
                               "fabrics. Chairs vary in design. An armchair has armrests fixed to the seat; a "
                               "recliner is upholstered and features a mechanism that lowers the chair's back and "
                               "raises into place a footrest; a rocking chair has legs fixed to two long curved "
                               "slats; and a wheelchair has wheels fixed to an axis under the seat.",
                "price": 25.00,
                "rent_type": "Daily",
                "rent_price": 1.00,
                "category": [
                    CategoryModel.objects.get(category_name="Furniture"),
                    CategoryModel.objects.get(category_name="Home Appliances")
                ],
                "owner": UserModel.objects.get(id=1),
            },
            {
                "title": "Barbie Doll",
                "description": "Barbie is a fashion doll created by American businesswoman Ruth Handler, manufactured "
                               "by American toy company Mattel and launched in 1959. The toy is the figurehead of the "
                               "Barbie brand that includes a range of fashion dolls and accessories. Barbie has been "
                               "an important part of the toy fashion doll market for over six decades. Mattel has "
                               "sold over a billion Barbie dolls, making it the company's largest and most profitable "
                               "line.",
                "price": 10.00,
                "rent_type": "Daily",
                "rent_price": 1.00,
                "category": [CategoryModel.objects.get(category_name="Toys")],
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