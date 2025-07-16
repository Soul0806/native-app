import csv
import io
import os
import pandas as pd

from collections import defaultdict
import re

import requests

spec_list = defaultdict(lambda: defaultdict(lambda: defaultdict(int))) 
file_path = "assets/specs.csv"  # 改成你的檔案路徑

df = pd.read_csv(file_path)
print(df)
def getStock(): 
    for _, row in df.iterrows():
            columns = row.dropna()  # 只保留非 NaN 的欄位        
            list_cols = list(columns.items())
            rowNum = len(list_cols)
            loc = ''
            for i in range(0, rowNum, 2):
                col_x, col_spec = list_cols[i]
                col_x1, col_num = list_cols[i+1] if i+1 < rowNum else (None, 0)
                
                inch = col_spec[-2:]
                loc = '貨櫃內' if col_x[:1] == 'A' else '貨櫃外'
                # spec_list[inch][col_spec][col_x[:1]] += int(col_num)
                spec_list[inch][col_spec][loc] += int(col_num)
    
    return spec_list



# print(getStock())
# pprint(spec_list['20']['225/35-20']['A'])      

# for row_index, row in df.iterrows():
  
#    for idx, col in enumerate(df.columns):                       
#        if (pd.isna(row[col])): continue

#        if (idx % 2 == 0):
#            spec = row[col].strip()           
#        else:           
#            inch = spec.split('-')[-1]
#            num = 0 if pd.isna(row[col]) else row[col]                    
#            spec_list[inch][spec] += int(num)       



