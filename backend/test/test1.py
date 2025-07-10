import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# 建立相對目錄
output_dir = "output"
os.makedirs(output_dir, exist_ok=True)

from google.oauth2 import service_account
from googleapiclient.discovery import build
from libs.func import jsonWrite


# Step 1: 金鑰與 API 權限
SERVICE_ACCOUNT_FILE = 'assets/key/sincere-woods-463700-g2-2e80493599f3.json'
SCOPES = ['https://www.googleapis.com/auth/documents.readonly']

# Step 2: 建立憑證與服務
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('docs', 'v1', credentials=creds)

# Step 3: 讀取文件
DOCUMENT_ID = '1i99hV1NTcG-FOADhQ3yi1HLHghJFIn184w3SOe0NJSQ'
doc = service.documents().get(documentId=DOCUMENT_ID).execute()

args = [doc['body']['content']]
jsonWrite(args, 'output/output.txt')
# Step 4: 印出文字內容
# for element in doc['body']['content']:
#     if 'paragraph' in element:
#         for run in element['paragraph'].get('elements', []):
#             text_run = run.get('textRun')
#             if text_run:
#                 print(text_run['content'])


# https://docs.google.com/document/d/1i99hV1NTcG-FOADhQ3yi1HLHghJFIn184w3SOe0NJSQ/edit?tab=t.0#heading=h.mooaq32uc4l0pip install google-api-python-client google-auth google-auth-oauthlib
