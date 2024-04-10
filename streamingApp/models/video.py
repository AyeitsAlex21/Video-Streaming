from django.db import models

class Video(models.Model):

    videoID = models.IntegerField(primary_key=True, blank=False)
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField()

