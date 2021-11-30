from django.contrib import admin
from .models import *


class TodoAdmin(admin.ModelAdmin):
    list_display=('id','task','category','dueTime','dueDate',)
    ordering=('id',)
    search_fields=('id','task','category','dueTime','dueDate')


class CategoryAdmin(admin.ModelAdmin):
    list_display=('id','name')




admin.site.register(Todo,TodoAdmin)
admin.site.register(Category,CategoryAdmin)
