from django.conf import settings
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_mongo_client():
    mongo_settings = settings.MONGO_DATABASES['default']
    client = MongoClient(mongo_settings['CLIENT'], server_api=ServerApi('1'))
    return client

def get_database(db_name=None):
    client = get_mongo_client()
    db_name = db_name if db_name else settings.MONGO_DATABASES['default']['NAME']
    return client[db_name]