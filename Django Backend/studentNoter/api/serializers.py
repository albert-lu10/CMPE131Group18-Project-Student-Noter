from rest_framework import serializers
from noter.models import Category, Todo
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class TodoSerializer(serializers.ModelSerializer):
    dueTime = serializers.TimeField(format='%H:%M')
    class Meta:
        model=Todo
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','password')
        extra_kwargs={'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['password'])
        user.set_password(validated_data['password'])
        user.save()
        return user

# class UserRegisterSerializer(serializers.ModelSerializer):



#     class Meta:
#         model = settings.AUTH_USER_MODEL
#         fields = ('user_name', 'first_name')
#         extra_kwargs = {'password': {'write_only': True}}