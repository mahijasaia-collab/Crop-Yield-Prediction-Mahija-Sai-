from fastapi import APIRouter, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests

from app.config.settings import settings
from app.schemas.user_schema import UserRegister, UserLogin
from app.schemas.google_schema import GoogleToken

from app.database.mongodb import users_collection
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ---------------- REGISTER ---------------- #

@router.post("/register")
async def register(user: UserRegister):

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
        "password": hash_password(user.password),
        "provider": "local",
        "role": user.role
    }

    result = await users_collection.insert_one(new_user)

    return {
        "message": "Registration Successful",
        "id": str(result.inserted_id)
    }


# ---------------- LOGIN ---------------- #

@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one(
        {"email": user.email}
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    if db_user["provider"] == "google":
        raise HTTPException(
            status_code=401,
            detail="Please login using Google"
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
            "sub": db_user["email"],
            "role": db_user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "full_name": db_user["full_name"],
            "email": db_user["email"],
            "role": db_user["role"]
        }
    }


# ---------------- GOOGLE LOGIN ---------------- #

@router.post("/google")
async def google_login(data: GoogleToken):

    try:

        idinfo = id_token.verify_oauth2_token(
            data.token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]
        name = idinfo.get("name", "")

        user = await users_collection.find_one(
            {"email": email}
        )

        if user is None:

            await users_collection.insert_one(
                {
                    "full_name": name,
                    "email": email,
                    "password": "",
                    "provider": "google",
                    "role": "farmer"
                }
            )

            user = await users_collection.find_one(
                {"email": email}
            )

        token = create_access_token(
            {
                "sub": email,
                "role": "farmer"
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "full_name": user["full_name"],
                "email": user["email"],
                "role": "farmer"
            }
        }

    except Exception as e:
        print(e)

        raise HTTPException(
            status_code=401,
            detail="Google Authentication Failed"
        )