# backend/db.py
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
db = client["model_tracker"]
models_col = db["models"]
drift_col = db["drift_reports"]

def save_model_metadata(name: str, metrics: dict):
    doc = {
        "model_name": name,
        "metrics": metrics,
        "timestamp": datetime.now()
    }
    models_col.insert_one(doc)

def save_drift_report(model_name: str, report: dict):
    doc = {
        "model_name": model_name,
        "drift_report": report,
        "timestamp": datetime.now()
    }
    drift_col.insert_one(doc)
