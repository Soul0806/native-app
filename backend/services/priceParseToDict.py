import os
import platform
import time
import json
import backend.services.writeFromGApidoc
import re
# from backend.services import write_from_googleApidoc
from collections import defaultdict
from backend.libs.func import BASE_DIR


def priceParseToDict():    
    input_file = f'{BASE_DIR}/assets/price.txt'
    result = defaultdict(list)    
    with open(input_file, "r", encoding="utf-8") as infile:
        for line in infile:
            clean_line = line.strip()            
            match = re.search(r"^(\S+)\s+\[(.+)\]", clean_line)
            
            if match:
                result[match.group(1)] = match.group(2)
            
    return result        
            # print(match.group(1), match.group(2))
            # print(clean_line)
            # if (not clean_line) or ("==" in clean_line):
            #     continue        
            # if "/" in clean_line and len(clean_line) < 7:
            #     date = clean_line        
            # else:
            #     result[date].append(clean_line)
        
        # json.dump(dict(result), outfile, ensure_ascii=False, indent=2)        
        
