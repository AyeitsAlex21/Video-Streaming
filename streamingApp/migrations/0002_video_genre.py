# Generated by Django 4.2.11 on 2024-04-16 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streamingApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='genre',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]