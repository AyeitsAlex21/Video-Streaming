# Generated by Django 4.2.11 on 2024-04-21 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streamingApp', '0003_video_thumbnail_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='video',
            name='videoID',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
