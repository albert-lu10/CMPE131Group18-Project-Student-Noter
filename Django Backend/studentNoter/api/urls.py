from .views import *
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('', views.getRoutes),
    path('todos/',views.getTodo,name="Todo"),
    path('category/',views.getCategory,name="Category"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',views.Register,name="Register"),
    path('create/', views.TodoCreate,name='CreateTodo'),
    path('delete/<int:pk>/', views.TodoDelete,name='Todo-delete'),
    path('category-create/', views.CategoryCreate,name='CreateCategory'),
    path('category-delete/<str:pk>/', views.CategoryDelete,name='Category-delete'),
    path('update/<int:pk>/', views.DescriptionEdit,name='Description-edit'),
    path('finished-update/<int:pk>/', views.FinishedEdit,name='Finished-edit'),

]