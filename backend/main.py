# backend/main.py
from fastapi import FastAPI, UploadFile, File
from drift import check_drift
from db import save_model_metadata, save_drift_report
from report import generate_pdf
import pickle, pandas as pd
import os

app = FastAPI()
models = {}

@app.post("/upload_model")
async def upload_model(file: UploadFile = File(...)):
    contents = await file.read()
    model = pickle.loads(contents)
    models[file.filename] = model

    # Simulate metric logging
    metrics = {"accuracy": 0.91, "f1_score": 0.88}
    save_model_metadata(file.filename, metrics)

    return {"status": "model uploaded", "model_id": file.filename}

@app.post("/upload_dataset")
async def upload_dataset(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    drift_result = check_drift(df)

    # Save to DB
    model_name = list(models.keys())[0] if models else "unknown_model"
    save_drift_report(model_name, drift_result)

    return {"drift": drift_result}

@app.get("/download_report/{model_name}")
async def download_report(model_name: str):
    # Placeholder metrics and drift summary
    metrics = {"accuracy": 0.91, "f1_score": 0.88}
    drift_summary = "Drift detected in feature1 with p < 0.05"

    path = generate_pdf(model_name, metrics, drift_summary)
    return {"report_path": path}
