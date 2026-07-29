from fastapi import FastAPI
from app.database.mongodb import client

app = FastAPI(
    title="YieldSense AI",
    description="AI Crop Yield Prediction System",
    version="1.0.0"
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
from app.routers.auth import router as auth_router
from app.routers.farmers import router as farmers_router
app.include_router(auth_router)
app.include_router(farmers_router)