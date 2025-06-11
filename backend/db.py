# backend/db.py
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Get MongoDB connection string from environment variable
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database()  # Database name is already in connection string
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
