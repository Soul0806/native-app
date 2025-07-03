start: 
	uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

nativewind:
	npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
	npx tailwindcss init
## 建立 Virtual Enviroment
venv:
	if [! -d venv]; then \
		echo "建立venv..."; \
		python3 -m venv venv; \
	fi 
	
	OS_NAME := $(shell uname -s)
	ifeq ($(OS_NAME), Darwin)
		ACTIVATE := source venv/bin/activate
	else 
		ACTIVATE := source venv/scripts/activate
	endif

	$(ACTIVATE)
	
#＃　啟動 FastApi 開發伺服器	
	