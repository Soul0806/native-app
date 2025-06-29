from sqlalchemy import Column, Integer, String

from backend.database import Base

class TireBrand(Base): 
    __tablename__ = "tire_brands"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)


