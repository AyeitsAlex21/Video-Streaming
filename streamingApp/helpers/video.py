import boto3
from django.http import JsonResponse

def list_videos_and_thumbnails(request):
    s3_client = boto3.client('s3')
    bucket_name = 'amplify-streamingapp-staging-87059-deployment'
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