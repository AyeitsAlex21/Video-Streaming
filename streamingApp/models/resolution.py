from django.db import models
from .video import Video

class Resolution(models.Model):

    resolutionID = models.AutoField(primary_key=True, blank=False)
    resolution = models.CharField(max_length=30, blank=True)
    video_url = models.URLField(max_length=300, blank=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='resolutions')