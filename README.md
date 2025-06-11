# README.md
# ModelDriftTrackr

A minimal full-stack app to monitor ML model performance and data drift.

## Features
- Upload sklearn `.pkl` models
- Upload test datasets
- Run drift detection using Evidently
- View metrics and export PDF reports (soon)

## Stack
- FastAPI
- Evidently
- MongoDB (TBD)
- Next.js (TBD)
- Docker

## Usage
```bash
docker-compose up --build
```

Hit API at: `http://localhost:8000/docs`

Frontend scaffolding to be added next.