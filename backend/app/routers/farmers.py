from fastapi import APIRouter
from app.database.mongodb import farmers_collection

router = APIRouter(prefix="/farmers", tags=["Farmers"])


@router.get("/")
async def get_all_farmers():

    farmers = []

    async for farmer in farmers_collection.find():
        farmer["_id"] = str(farmer["_id"])
        farmers.append(farmer)

    return farmers