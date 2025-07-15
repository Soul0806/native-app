import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.libs.func import BASE_DIR

# 建立相對目錄
output_dir = "output"
os.makedirs(output_dir, exist_ok=True)

from google.oauth2 import service_account
from googleapiclient.discovery import build
from libs.func import jsonWrite
from libs.func import find_root_by_name

rootPath = find_root_by_name()
# Step 1: 金鑰與 API 權限
SERVICE_ACCOUNT_FILE = f'{BASE_DIR}/assets/key/sincere-woods-463700-g2-2e80493599f3.json'
SCOPES = ['https://www.googleapis.com/auth/documents.readonly']

# Step 2: 建立憑證與服務
creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('docs', 'v1', credentials=creds)

# Step 3: 讀取文件
DOCUMENT_ID = '1i99hV1NTcG-FOADhQ3yi1HLHghJFIn184w3SOe0NJSQ'

def writeFromGApidoc(): 
    doc = service.documents().get(documentId=DOCUMENT_ID).execute()
                    
    contents = [
        run['textRun']['content']
        for element in doc.get('body', {}).get('content', [])
        if 'paragraph' in element
        for run in element['paragraph'].get('elements', [])
        if 'textRun' in run
    ]

    jsonWrite(contents, f'{rootPath}/assets/records_googleApidoc.txt')
# https://docs.google.com/document/d/1i99hV1NTcG-FOADhQ3yi1HLHghJFIn184w3SOe0NJSQ/edit?tab=t.0#heading=h.mooaq32uc4l0pip install google-api-python-client google-auth google-auth-oauthlib
