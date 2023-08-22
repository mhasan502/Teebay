import jwt
import graphene
from django.core.exceptions import ValidationError
from .models import UserModel


class LoginMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    token = graphene.String()

    @classmethod
    def mutate(cls, args):
        user = UserModel.objects.filter(email=args.email).first()

        if user is None:
            raise ValidationError('Invalid email address')

        if not user.check_password(args.password):
            raise ValidationError('Invalid password')

        token = jwt.encode({'user_id': user.id}, algorithm='HS256')

        return LoginMutation(token=token)