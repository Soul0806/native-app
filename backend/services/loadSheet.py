import sys
import os
# 加入 backend 的上層目錄（根目錄）
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

import pandas as pd
import numpy as np
import gspread
from collections import defaultdict
from google.oauth2.service_account import Credentials

from backend.libs.func import BASE_DIR

# 指定憑證 JSON 檔路徑
SERVICE_ACCOUNT_FILE = f'{BASE_DIR}/assets/key/sincere-woods-463700-g2-2e80493599f3.json'

# 設定授權範圍
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# 建立憑證物件
credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=SCOPES
)

# 建立 gspread client
client = gspread.authorize(credentials)

def loadStock(): 
    spec_list = defaultdict(lambda: defaultdict(lambda: defaultdict(int))) 
    # 開啟 Google Sheet（可以用名稱或 Spreadsheet ID）
    spreadsheet_id = '1xrl--GTr2juevxrdBf0J96yMbw3l9qjdKCyuPxTAZIE'
    sheet = client.open_by_key(spreadsheet_id).worksheet('2025_07_16')
    
    # 讀取資料
    data = sheet.get_all_values()
    # 第一列作為欄位名稱
    df = pd.DataFrame(data[1:], columns=data[0])
    df.replace('', np.nan, inplace=True)
    for _, row in df.iterrows():
        columns = row.dropna()  # 只保留非 NaN 的欄位        
        list_cols = list(columns.items())
        rowNum = len(list_cols)
        loc = ''
        for i in range(0, rowNum, 2):
            col_x, col_spec = list_cols[i]
            col_x1, col_num = list_cols[i+1] if i+1 < rowNum else (None, 0)
            
            inch = col_spec[-2:]
            new_col_spec = col_spec.replace('/', '-')
            loc = '貨櫃內' if col_x[:1] == 'A' else '貨櫃外'
            # spec_list[inch][col_spec][col_x[:1]] += int(col_num)
            spec_list[inch][new_col_spec][loc] += int(col_num)
    
    return spec_list
