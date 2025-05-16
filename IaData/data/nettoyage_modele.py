# nettoyage_modele.py

import numpy as np
import pandas as pd
import re
import warnings
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

warnings.filterwarnings('ignore')

# ============================
# 1. Import et Nettoyage des données
# ============================

fichier = os.path.join(os.path.dirname(__file__), 'data\catastrophes_naturelles.xlsx')
df = pd.read_excel(fichier, header=None)

lignes_corrigees = []
for _, row in df.iterrows():
    non_vides = row.dropna().tolist()

    if len(non_vides) == 1:
        contenu = non_vides[0].replace('"', '').strip()
        valeurs = re.split(r',\s*(?![^\[]*\])', contenu)
        lignes_corrigees.append(valeurs)
    else:
        cleaned_row = [str(cell).replace('"', '') if isinstance(cell, str) else cell for cell in row.tolist()]
        lignes_corrigees.append(cleaned_row)

max_colonnes = max(len(ligne) for ligne in lignes_corrigees)
lignes_uniformes = [ligne + [np.nan] * (max_colonnes - len(ligne)) for ligne in lignes_corrigees]
df_final = pd.DataFrame(lignes_uniformes)

noms_colonnes = df_final.iloc[0]
df_final = df_final[1:]
df_final.columns = noms_colonnes
df_final.columns.values[0] = 'id'

# Formatage des colonnes
df_final['date'] = pd.to_datetime(df_final['date'], errors='coerce')
df_final['quartier'] = df_final['quartier'].astype(str).str[-1].astype(int)
df_final['seisme'] = 0
df_final['inondation'] = 0

for index, valeur in df_final['catastrophe'].items():
    if 'aucun' in valeur:
        continue
    if 'seisme' in valeur:
        df_final.at[index, 'seisme'] = 1
    if 'innondation' in valeur:
        df_final.at[index, 'inondation'] = 1

df_final = df_final.drop('catastrophe', axis=1)
df_final.to_excel('fichier_corrige.xlsx', index=False)

# ============================
# 2. Préparation des données
# ============================

numerical_cols = [
    'temperature',
    'humidite',
    'force_moyenne_du_vecteur_de_vent',
    'force_du_vecteur_de_vent_max',
    'pluie_intensite_max',
    'sismicite',
    'concentration_gaz',
    'pluie_totale',
    'quartier'
]

X = df_final[numerical_cols]
Y = df_final[['seisme', 'inondation']]

Xtrain, Xtest, Ytrain, Ytest = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=1)

scaler = StandardScaler()
Xtrain_scaled = scaler.fit_transform(Xtrain)
Xtest_scaled = scaler.transform(Xtest)

pca = PCA(n_components=3)
Xtrain_pca = pca.fit_transform(Xtrain_scaled)
Xtest_pca = pca.transform(Xtest_scaled)

Xtrain_new = np.concatenate((Xtrain_scaled, Xtrain_pca), axis=1)
Xtest_new = np.concatenate((Xtest_scaled, Xtest_pca), axis=1)

# ============================
# 3. Entraînement des modèles
# ============================

models = {
    'CART': DecisionTreeClassifier(random_state=1),
    'ID3': DecisionTreeClassifier(criterion='entropy', random_state=1),
    'KNN': KNeighborsClassifier(n_neighbors=5),
    'Neural Network': MLPClassifier(hidden_layer_sizes=(40, 20), random_state=1),
    'Random Forest': RandomForestClassifier(n_estimators=100, max_depth=10, random_state=1)
}

results = {'Model': [], 'Accuracy': [], 'Precision': [], 'Recall': [], 'Data': []}

for name, model in models.items():
    model.fit(Xtrain_new, Ytrain)
    y_pred = model.predict(Xtest_new)
    results['Model'].append(name)
    results['Accuracy'].append(accuracy_score(Ytest, y_pred))
    results['Precision'].append(precision_score(Ytest, y_pred, average='weighted'))
    results['Recall'].append(recall_score(Ytest, y_pred, average='weighted'))
    results['Data'].append(model)

results_df = pd.DataFrame(results)
print(results_df[['Model', 'Accuracy', 'Precision', 'Recall']])

# ============================
# 4. Utilisation du meilleur modèle
# ============================

best_model = results_df.loc[results_df['Accuracy'].idxmax(), 'Data']
print("Meilleur modèle :", best_model)

# ============================
# 5. Exemple de prédiction
# ============================

nouveau_jour = pd.DataFrame([{
    'temperature': 6.2,
    'humidite': 78,
    'force_moyenne_du_vecteur_de_vent': 4.1,
    'force_du_vecteur_de_vent_max': 5.2,
    'pluie_intensite_max': 0,
    'sismicite': 0.7,
    'concentration_gaz': 230.1,
    'pluie_totale': 200.2,
    'quartier': 3
}])

X_scaled = scaler.transform(nouveau_jour)
X_pca = pca.transform(X_scaled)
X_input = np.concatenate((X_scaled, X_pca), axis=1)

pred = best_model.predict(X_input)
print("Prédiction [séisme, inondation] :", pred[0])

# Sauvegarde du modèle, du scaler et du PCA
joblib.dump(best_model, "modele_mlp.joblib")
joblib.dump(scaler, "scaler.joblib")
joblib.dump(pca, "pca.joblib")