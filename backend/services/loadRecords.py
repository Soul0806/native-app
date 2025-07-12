# import os
# import platform
# import time
# import json
# from collections import defaultdict
import ast
from backend.libs.func import BASE_DIR
import backend.services.txtParseTodict

def loadRecords():
    file_name = '/assets/output1.txt'

    with open(f"{BASE_DIR}{file_name}", "r", encoding="utf-8") as f: 
        content = f.read();
        
    return ast.literal_eval(content)
    
# dict_record = ast.literal_eval(content)

#      open(output_file, "w", encoding="utf-8") as outfile):
#     for line in infile:
#         clean_line = line.strip()
#         if not clean_line:
#             continue
        
#         if "/" in clean_line and len(clean_line) < 7:
#             date = clean_line
#             print(date)
#         else:
#              result[date].append(clean_line)
    
#     json.dump(dict(result), outfile, ensure_ascii=False, indent=2)
