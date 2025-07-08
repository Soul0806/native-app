import os
import platform
import time
import json
from collections import defaultdict
from backend.libs.func import BASE_DIR


input_file = f'{BASE_DIR}/assets/sale.txt'
output_file = f'{BASE_DIR}/assets/output.txt'
result = defaultdict(list)

with (open(input_file, "r", encoding="utf-8") as infile, 
     open(output_file, "w", encoding="utf-8") as outfile):
    for line in infile:
        clean_line = line.strip()
        if not clean_line:
            continue
        
        if "/" in clean_line and len(clean_line) < 7:
            date = clean_line
        # print(date)
        else:
             result[date].append(clean_line)
    
    json.dump(dict(result), outfile, ensure_ascii=False, indent=2)