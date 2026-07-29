from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

client = AsyncIOMotorClient(settings.MONGODB_URL)

db = client[settings.DATABASE_NAME]

users_collection = db["users"]
farmers_collection = db["farmers"]
predictions_collection = db["predictions"]