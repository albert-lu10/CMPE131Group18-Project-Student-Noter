# from rest_framework import generics
from noter.models import Category, Todo
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
import json
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import mixins, viewsets
from . import serializers


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTodo(request):
    user=request.user
    todo = user.user_todo_set.all()
    serializer=TodoSerializer(todo, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategory(request):
    user=request.user
    todo = user.user_category_set.all()
    serializer=CategorySerializer(todo, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getCategory(request):
    user=request.user
    todo = user.user_category_set.all()
    serializer=CategorySerializer(todo, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def TodoCreate(request):
    user=request.user  
    userID = request.user.id
    payload = json.loads(request.body)
    categoryId=Category.objects.get(id=payload['category'],userId=userID)
    todo= Todo.objects.create(
        task=payload['task'],
        userId=user,
        category=categoryId,
        dueTime=payload['time'],
        dueDate=payload['date'],
        description=payload['description'],
        finished=payload['finished'],
    )
    serializer=TodoSerializer(todo)
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CategoryCreate(request):
    user=request.user
    payload = json.loads(request.body)
    category=Category.objects.create(
        name=payload['name'],
        userId=user,
    )
    serializer=CategorySerializer(category)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def TodoDelete(request, pk):
    user = request.user
    todo= Todo.objects.get(id=pk,userId=user)
    todo.delete()    
    return Response(status=status.HTTP_204_NO_CONTENT)
	# task = Todo.objects.get(id=pk)
	# task.delete()
	# return Response('Item succsesfully delete!')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CategoryDelete(request,pk):
    user = request.user
    category = Category.objects.get(name=pk,userId=user)
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    serializer = serializers.RegisterSerilizer(data=request.data)
    if serializer.is_valid():
        account=serializer.save()
        if account:
            return Response(status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def DescriptionEdit(request,pk):
    user = request.user.id
    payload = json.loads(request.body)
    todo_item= Todo.objects.filter(id=pk,userId=user)
    todo_item.update(description=payload['description'])
    todo=Todo.objects.get(id=pk)
    serializer=TodoSerializer(todo)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def FinishedEdit(request,pk):
    user = request.user.id
    payload = json.loads(request.body)
    todo_item= Todo.objects.filter(id=pk,userId=user)
    todo_item.update(finished=payload['finished'])
    todo=Todo.objects.get(id=pk)
    serializer=TodoSerializer(todo)
    return Response(serializer.data)

# # t = TemperatureData.objects.get(id=1)
# t.value = 999  # change field
# t.save()