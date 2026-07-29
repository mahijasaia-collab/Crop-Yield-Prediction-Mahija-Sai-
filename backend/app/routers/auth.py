from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserRegister, UserLogin
from app.database.mongodb import users_collection
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register(user: UserRegister):
    try:
        existing = await users_collection.find_one(
            {"email": user.email}
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        new_user = {
            "full_name": user.full_name,
            "email": user.email,
            "password": hash_password(user.password)
        }

        result = await users_collection.insert_one(new_user)

        return {
            "message": "Registration Successful",
            "id": str(result.inserted_id)
        }

    except Exception as e:
        print("REGISTER ERROR:", repr(e))
        raise

@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    token = create_access_token(
        {
            "sub": db_user["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }