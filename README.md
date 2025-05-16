# hack48H

## Install dependency

```bash
npm i
cd ./front
npm i
cd ../IaData
pip install -r requirements.txt
```
# startserver 

```bash
npm run dev
cd ./front
npm run dev
cd ../IaData/api
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

