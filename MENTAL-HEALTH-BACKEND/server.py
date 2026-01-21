from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import os
from fastapi.middleware.cors import CORSMiddleware


AZURE_ML_URL = "http://82be1cef-dd5e-4b66-a5fa-de96c1be3dea.polandcentral.azurecontainer.io/score"
AZURE_ML_API_KEY = os.getenv("BswBxAh4jvbLgsTKKgBpKHtRm3jvPKMu", "MhCTJKHKM0dAQzBCelhVWGtcrn76dAue")

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {AZURE_ML_API_KEY}"
}

app = FastAPI(title="Mental Health Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    age: int
    gender: str
    region: str
    income_level: str
    education_level: str
    daily_role: str
    device_hours_per_day: float
    phone_unlocks: int
    notifications_per_day: int
    social_media_mins: int
    study_mins: int
    physical_activity_days: int
    sleep_hours: float
    sleep_quality: int
    anxiety_score: int
    depression_score: int
    stress_level: int
    happiness_score: int
    device_type: str
    productivity_score: int
    digital_dependence_score: int
    focus_score: int

@app.get("/")
def health_check():
    return "Healthy"

@app.post("/predict")
def predict(data: PredictionInput):
    """
    Receives clean JSON input,
    wraps it into Azure ML format,
    forwards request to Azure ML endpoint,
    returns prediction.
    """

    azure_payload = {
        "Inputs": {
            "input1": [
                data.dict()
            ]
        },
        "GlobalParameters": {}
    }

    try:
        response = requests.post(
            AZURE_ML_URL,
            headers=HEADERS,
            json=azure_payload,
            timeout=10
        )
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text
        )

    return response.json()
