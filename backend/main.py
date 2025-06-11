from fastapi import FastAPI, UploadFile, File
from drift import check_drift
import pickle
import panda as pd

app = FastAPI()

models = {}
@app.post("/upload_model/")
async def upload_model(file: UploadFile = File(...)):
    contents = await file.read()
    model = pickle.loads(contents)
    models[file.filename] = model
    return {"status": "model uploaded", "model_id": file.filename}

@app.post("/upload_dataset")
async def upload_dataset(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    drift_result = check_drift(df)
    return {"drift": drift_result}