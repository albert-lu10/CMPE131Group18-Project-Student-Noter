from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save

class Category(models.Model):
    name = models.CharField(max_length=30)
    userId=models.ForeignKey(User,related_name="user_category_set", on_delete=models.CASCADE,null=True)
    # color=foreignkey(Color...)
    def __str__(self):
        return self.name

        

class Todo(models.Model):
    userId=models.ForeignKey(User,related_name="user_todo_set", on_delete=models.CASCADE,null=True)
    category = models.ForeignKey(Category, related_name="category_todo_set",on_delete=models.PROTECT,null=True)
    task=models.CharField(max_length=100,null=True)
    dueTime=models.CharField(max_length=15,null=True,blank=True)
    dueDate=models.CharField(max_length=15,null=True,blank=True)
    description=models.TextField(null=True)
    finished=models.BooleanField(default=False)
    created=models.DateTimeField(default=timezone.now,null=True)

    # def save(self, *args, **kwargs):
    #     is_new = not self.pk
    #     super().save(*args, **kwargs)
    #     if is_new:
    #         if Category.objects.filter(name=self.category).exists():
    #             pass
    #         else:
    #             Category.objects.create(name=self.category,userId=self.userId)
    def __str__(self):
        return str(self.task)



# class Color(models.Model):
#     color