from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import session

from backend.database import SessionLocal,engine, Base
from backend.models import TireBrand

from typing import List, Annotated, Dict
from pydantic import BaseModel
from datetime import datetime

# from backend.services.loadRecords import loadRecords
from backend.services.writeFromGApidoc import writeFromGApidoc
from backend.services.txtParseTodict import txtParseToDict
from backend.services.test import test
from backend.services.loadRecords import loadRecords, loadTestRecords
from backend.services.loadSheet import loadStock
# from backend.getSpecs import getStock
# from backend.services import writeFromGApidoc, textParseTodict, loadRecords

# Pydantic 回傳模型
class Brand(BaseModel):
    id: int
    name: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
    
class BrandCreate(BaseModel):
    name: str    
    
spec_model = Dict[str, Dict[str, Dict[str, int]]]
record_model = Dict[str, List[str]]
testRecord_model = Dict[str, Dict[str, List[str]]]

app = FastAPI()
origins = [
    "http://localhost:8081",  # 你前端的開發網址
    "http://127.0.0.1:8081"   # 可選，補一個別名
    "http://localhost:8082",  # 你前端的開發網址
    "http://127.0.0.1:8082"   # 可選，補一個別名
]

app.add_middleware(
    CORSMiddleware,    
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

db_denpendency = Annotated[session, Depends(get_db)]
# Base.metadata.create_all(bind=engine)

@app.middleware("http")
async def check_auth(request: Request, call_next):
    if request.headers.get("x-api-key") != "00001111":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return await call_next(request)

@app.get('/csv/specs', response_model=spec_model)
def getSpe(db: db_denpendency):
    allStock = loadStock()
    return  allStock

@app.get('/brands', response_model=List[Brand])
def getBrands(db: db_denpendency):
    brands = db.query(TireBrand).all()    
    return brands

@app.get('/txt/records', response_model=record_model)
def getBrands(db: db_denpendency):    
    writeFromGApidoc()
    txtParseToDict()
    records = loadRecords()    
    return records

# @app.get('/txt/price', response_model=record_model)
# def getBrands(db: db_denpendency):    
#     writeFromGApidoc()
#     txtParseToDict()
#     records = loadRecords()    
#     return records

@app.get('/test/txt/records', response_model=testRecord_model)
def getBrands(db: db_denpendency):    
    # writeFromGApidoc()
    test()
    records = loadTestRecords()        
    return records

@app.post('/brand/insert', response_model=Brand)
def insertBrand(brand: BrandCreate, db: db_denpendency):
    db_brand = TireBrand(name=brand.name)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

@app.post("/refresh-data")
def refresh_data():
    writeFromGApidoc()
    txtParseToDict()
    records = loadRecords()    
    return records