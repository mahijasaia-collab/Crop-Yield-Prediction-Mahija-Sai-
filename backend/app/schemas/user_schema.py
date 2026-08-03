from pydantic import BaseModel, EmailStr
from typing import Literal


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal["admin", "farmer"] = "farmer"


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Literal["admin", "farmer"]


class UserResponse(BaseModel):
    full_name: str
    email: EmailStr
    role: str