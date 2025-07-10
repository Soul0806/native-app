import json

from pathlib import Path
BASE_DIR = Path(__file__).parent.parent.resolve()

def add(x: int, y: int) -> int:
    return x + y
  
# def jsonWrite(args, file):    
#     with open(file, 'w', encoding="UTF-8") as f:
#         json.dump(data, f, ensure_ascii=False, indent=2)

def jsonAppend(args, file):    
    with open(file, 'a', encoding="UTF-8") as f:
        for arg in args:
            json.dump(arg, f, ensure_ascii=False, indent=2)

def jsonWrite(args, file):    
    with open(file, 'w', encoding="UTF-8") as f:
        for arg in args:
            json.dump(arg, f, ensure_ascii=False, indent=2)