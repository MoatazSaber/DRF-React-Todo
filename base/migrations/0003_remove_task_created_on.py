# Generated by Django 3.2 on 2021-04-09 02:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20210409_0430'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='created_on',
        ),
    ]
