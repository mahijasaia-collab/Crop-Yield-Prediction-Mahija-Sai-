from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.users import router as users_router

from app.database.mongodb import client
from app.routers.auth import router as auth_router
from app.routers.farmers import router as farmers_router
print("MAIN IMPORTED USERS ROUTER")
app = FastAPI(
    title="YieldSense AI",
    description="AI Crop Yield Prediction System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "🌾 Welcome to YieldSense AI"
    }

@app.get("/health")
async def health():
    try:
        await client.admin.command("ping")
        return {
            "status": "Connected",
            "database": "MongoDB Atlas"
        }
    except Exception as e:
        return {
            "status": "Failed",
            "error": str(e)
        }

app.include_router(auth_router)
app.include_router(farmers_router)
app.include_router(users_router)