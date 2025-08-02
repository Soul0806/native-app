import os
import platform
import time
import json
import re
import pprint
import backend.services.writeFromGApidoc
# from backend.services import write_from_googleApidoc
from collections import defaultdict
from backend.libs.func import BASE_DIR

# input_file = f'{BASE_DIR}/assets/records_assets.txt'
# output_file = f'{BASE_DIR}/assets/output.txt'
def test():
    input_file = f'{BASE_DIR}/assets/records_googleApidoc.txt'
    output_file = f'{BASE_DIR}/assets/output2.txt'

    # result = defaultdict(list)
    result_1 = defaultdict(lambda: defaultdict(list))

    with (open(input_file, "r", encoding="utf-8") as infile, 
        open(output_file, "w", encoding="utf-8") as outfile):
        for line in infile:
            clean_line = line.strip()
            if not clean_line:
                continue
            if "==" in clean_line:
                year = re.search(r"==(\d+)==", clean_line).group(1)                
                continue            
            if "/" in clean_line and len(clean_line) < 7:
                date = clean_line        
            else:
                result_1[year][date].append(clean_line)
        
        json.dump(dict(result_1), outfile, ensure_ascii=False, indent=2)        
   
test()