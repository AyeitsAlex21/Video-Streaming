from django.db import models

class Video(models.Model):

    videoID = models.AutoField(primary_key=True, blank=False)
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=50, blank=True)
    thumbnail_url = models.URLField(max_length=300, blank=True, default="")

