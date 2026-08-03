from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database.mongodb import users_collection
from app.schemas.user_schema import UserRegister

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("")
async def get_users():

    users=[]

    async for user in users_collection.find({},{"password":0}):

        user["_id"]=str(user["_id"])

        users.append(user)

    return users


@router.post("")
async def add_user(user:UserRegister):

    existing=await users_collection.find_one(
        {
            "email":user.email
        }
    )

    if existing:
        raise HTTPException(400,"Email already exists")

    await users_collection.insert_one(
        {
            "full_name":user.full_name,
            "email":user.email,
            "password":"",
            "provider":"admin",
            "role":user.role
        }
    )

    return {
        "message":"User Added"
    }


@router.put("/{id}")
async def update_user(id:str,user:UserRegister):

    result=await users_collection.update_one(
        {
            "_id":ObjectId(id)
        },
        {
            "$set":{
                "full_name":user.full_name,
                "email":user.email,
                "role":user.role
            }
        }
    )

    if result.modified_count==0:
        raise HTTPException(404,"User not found")

    return {
        "message":"Updated"
    }


@router.delete("/{id}")
async def delete_user(id:str):

    result=await users_collection.delete_one(
        {
            "_id":ObjectId(id)
        }
    )

    if result.deleted_count==0:
        raise HTTPException(404,"User not found")

    return {
        "message":"Deleted"
    }