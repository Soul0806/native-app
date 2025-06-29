from sqlalchemy import Column, Integer, String,DateTime

from backend.database import Base

import pytz
from datetime import datetime

tz = pytz.timezone('Asia/Taipei')

class TireBrand(Base): 
    __tablename__ = "tire_brands"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(tz))


