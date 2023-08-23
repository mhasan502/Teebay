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

    operations = [
        migrations.CreateModel(
            name="CategoryModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
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
        migrations.RunPython(
            code=populate_category_table
        ),
    ]
