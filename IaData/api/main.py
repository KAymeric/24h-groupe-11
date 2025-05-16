# main.py
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

# Charge ton modèle
model = joblib.load("modele_mlp.joblib")
scaler = joblib.load("scaler.joblib")
pca = joblib.load("pca.joblib")

class DonneesInput(BaseModel):
    temperature: float
    humidite: float
    force_moyenne_du_vecteur_de_vent: float
    force_du_vecteur_de_vent_max: float
    pluie_intensite_max: float
    sismicite: float
    concentration_gaz: float
    pluie_totale: float

@app.post("/predict")
def predict(data: DonneesInput):
    valeurs = np.array([[
        data.temperature,
        data.humidite,
        data.force_moyenne_du_vecteur_de_vent,
        data.force_du_vecteur_de_vent_max,
        data.pluie_intensite_max,
        data.sismicite,
        data.concentration_gaz,
        data.pluie_totale
    ]])
    
    valeurs_scaled = scaler.transform(valeurs)
    valeurs_pca = pca.transform(valeurs_scaled)
    valeurs_finales = np.concatenate((valeurs_scaled, valeurs_pca), axis=1)

    prediction = model.predict(valeurs_finales)[0].tolist()

    return {"seisme": bool(prediction[0]), "inondation": bool(prediction[1])}
