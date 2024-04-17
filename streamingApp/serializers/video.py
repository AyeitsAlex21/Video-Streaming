from rest_framework import serializers
from ..models.video import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['videoID', 'name', 'description', 'genre', 'thumbnail_url']
