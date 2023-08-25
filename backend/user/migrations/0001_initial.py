from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    def populate_user_table(self, schema_editor):
        UserModel = self.get_model("user", "UserModel")
        user_list = [
            {
                "first_name": "Mehedi",
                "last_name": "Hasan",
                "address": "Dhaka",
                "email": "mhasan502@gmail.com",
                "phone": "01700000000",
                "password": "12345678",
            },
            {
                "first_name": "Rafiqul",
                "last_name": "Islam",
                "address": "Tejgaon",
                "email": "rafiq@gmail.com",
                "phone": "01700000000",
                "password": "12345678",
            },
        ]
        for user in user_list:
            UserModel.objects.create(
                first_name=user["first_name"],
                last_name=user["last_name"],
                address=user["address"],
                email=user["email"],
                phone=user["phone"],
                password=user["password"],
            )

    operations = [
        migrations.CreateModel(
            name="UserModel",
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
                ("first_name", models.CharField(max_length=100)),
                ("last_name", models.CharField(max_length=100)),
                ("address", models.TextField(max_length=200)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(max_length=20)),
                ("password", models.CharField(max_length=128)),
            ],
            options={
                "verbose_name": "User",
                "verbose_name_plural": "Users",
            },
        ),
        migrations.RunPython(
            code=populate_user_table
        ),
    ]
