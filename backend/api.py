import requests
import pandas as pd
import io

# 你指定的工作表 CSV 連結
url = "https://docs.google.com/spreadsheets/d/1xrl--GTr2juevxrdBf0J96yMbw3l9qjdKCyuPxTAZIE/export?format=csv&gid=1393601945"

res = requests.get(url)
res.raise_for_status()  # 若抓不到會報錯

csv_text = res.text
df = pd.read_csv(io.StringIO(csv_text))

# 顯示前幾列
print(df.head())

# from pathlib import Path
# from fastapi import FastAPI
# from google.oauth2 import service_account
# from googleapiclient.discovery import build
# from googleapiclient.http import MediaIoBaseDownload

# import io
# import pandas as pd

# app = FastAPI()
# BASE_DIR = Path(__file__).resolve().parent
# SERVICE_ACCOUNT_FILE = BASE_DIR / "key.json"
# # 掛載 service account
# SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
# credentials = service_account.Credentials.from_service_account_file(
#     SERVICE_ACCOUNT_FILE, scopes=SCOPES
# )

# drive_service = build('drive', 'v3', credentials=credentials)

# file_id = 'GTr2juevxrdBf0J96yMbw3l9qjdKCyuPxTAZIE'
# request = drive_service.files().get_media(fileId=file_id)
# fh = io.BytesIO()
# downloader = MediaIoBaseDownload(fh, request)

# done = False
# while not done:
#     status, done = downloader.next_chunk()

# fh.seek(0)
# df = pd.read_csv(fh)
# print(df.to_dict(orient='records'))

# @app.get("/fetch-csv")
# def fetch_csv():
#     drive_service = build('drive', 'v3', credentials=credentials)

#     file_id = '你的CSV檔案ID'
#     request = drive_service.files().get_media(fileId=file_id)
#     fh = io.BytesIO()
#     downloader = MediaIoBaseDownload(fh, request)

#     done = False
#     while not done:
#         status, done = downloader.next_chunk()

#     fh.seek(0)
#     df = pd.read_csv(fh)
#     return df.to_dict(orient='records')
