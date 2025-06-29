import pandas as pd
import io
import requests
import unicodedata

# ========== 1. 讀取線上資料 ==========
url = "https://docs.google.com/spreadsheets/d/1xrl--GTr2juevxrdBf0J96yMbw3l9qjdKCyuPxTAZIE/export?format=csv&gid=1393601945"
res = requests.get(url)
res.raise_for_status()
df_online = pd.read_csv(io.StringIO(res.text), dtype=str).fillna("")

# ========== 2. 讀取本地資料（指定編碼防亂碼） ==========
df_local = pd.read_csv("assets/specs.csv", encoding="utf-8-sig", dtype=str).fillna("")

# ========== 3. 欄位標題清理 ==========
df_online.columns = df_online.columns.str.strip()
df_local.columns = df_local.columns.str.strip()

# ========== 4. 文字正規化處理（解決 ï¼, 全形數字 等亂碼） ==========
def normalize_dataframe(df):
    return df.applymap(lambda x: unicodedata.normalize('NFKC', x) if pd.notna(x) else x)

df_online = normalize_dataframe(df_online)
df_local = normalize_dataframe(df_local)

# ========== 5. 比較 ==========
df_online = df_online.reset_index(drop=True)
df_local = df_local.reset_index(drop=True)

print("線上第13列：\n", df_online.iloc[0])
print("本地第13列：\n", df_local.iloc[1])

# if df_online.equals(df_local):
#     print("✅ 線上與本地資料完全一致")
# else:
#     print("❌ 資料不同，差異如下：")
#     print(df_local.compare(df_online))
