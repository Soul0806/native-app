from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import session
from backend.database import SessionLocal,engine, Base

from backend.models import TireBrand
from typing import List, Annotated, Dict
from pydantic import BaseModel
from backend.getSpecs import spec_list
from datetime import datetime

# Pydantic 回傳模型
class Brand(BaseModel):
    id: int
    name: str
    create_at: datetime

    model_config = {
        "from_attributes": True
    }
    
class BrandCreate(BaseModel):
    name: str    
    
spec_model = Dict[str, Dict[str, Dict[str, int]]]

app = FastAPI()
origins = [
    "http://localhost:8081",  # 你前端的開發網址
    "http://127.0.0.1:8081"   # 可選，補一個別名
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
Base.metadata.create_all(bind=engine)

@app.middleware("http")
async def check_auth(request: Request, call_next):
    if request.headers.get("x-api-key") != "00001111":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return await call_next(request)

@app.get('/test', response_model=spec_model)
def getSpe(db: db_denpendency):
    return spec_list

@app.post('/test1', response_model=Brand)
def createBrand(brand: BrandCreate, db: db_denpendency):
    db_brand = TireBrand(name=brand.name)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand