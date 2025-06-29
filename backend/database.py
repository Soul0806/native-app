from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# URL_DATABASE = 'postgresql://soul:1234@localhost:5432/test'
URL_DATABASE = 'postgresql://postgres:KFkAQWInoLANLyiXZrhzEVzDTzHHDQNC@centerbeam.proxy.rlwy.net:57074/railway'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autoflush=False, bind=engine)

Base = declarative_base()