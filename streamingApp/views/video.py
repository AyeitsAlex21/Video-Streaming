from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import boto3

from ..models.video import Video

# Create your views here

def create_video(request):
    #video = Video.objects.create(name=)
    return None

def list_videos(request):
    s3_client = boto3.client('s3')
    bucket_name = 'streaming.c5e6ea8wwo84.us-east-2.rds.amazonaws.com'
    prefix = 'videos/'

    # List all subdirectories (prefixes) under the given prefix
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix, Delimiter='/')
    items = []

    # Retrieve subfolder content
    for content in response.get('CommonPrefixes', []):
        subfolder_prefix = content.get('Prefix')
        # Now list objects within this subfolder
        subfolder_response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=subfolder_prefix)
        for obj in subfolder_response.get('Contents', []):
            # Assuming the object key format is "subfolder/filename"
            file_name = obj['Key'].split('/')[-1]
            if file_name in ['video', 'thumbnail']:
                items.append({
                    'type': file_name,
                    'url': f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}"
                })

    return JsonResponse({'items': items})

def get_recommended(request):
    return None
    

def generate_presigned_url(request):
    s3_client = boto3.client('s3', region_name='your-region-name',
                             aws_access_key_id='your-access-key',
                             aws_secret_access_key='your-secret-key')

    # You might want to dynamically set 'Key' based on user/session information
    video_presigned_url = s3_client.generate_presigned_url('put_object',
                                                           Params={
                                                               'Bucket': 'your-bucket-name',
                                                               'Key': 'videos/video.mp4',
                                                           },
                                                           ExpiresIn=3600)  # URL expires in 1 hour

    thumbnail_presigned_url = s3_client.generate_presigned_url('put_object',
                                                               Params={
                                                                   'Bucket': 'your-bucket-name',
                                                                   'Key': 'thumbnails/thumbnail.jpg',
                                                               },
                                                               ExpiresIn=3600)  # URL expires in 1 hour

    # Return the pre-signed URLs in the response
    return JsonResponse({
        'video_presigned_url': video_presigned_url,
        'thumbnail_presigned_url': thumbnail_presigned_url,
    })