# Generated by Django 3.2.9 on 2021-11-17 09:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('noter', '0004_alter_todo_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='updated',
        ),
        migrations.AlterField(
            model_name='todo',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='category_todo_set', to='noter.category'),
        ),
    ]
