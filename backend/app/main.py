from fastapi import FastAPI

app = FastAPI(
    title="YieldSense AI",
    description="AI Crop Yield Prediction and Agricultural Productivity Forecasting System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "🌾 Welcome to YieldSense AI"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "backend": "Running Successfully"
    }