all:	
	cd "study-life-smart-frontend" && "$(MAKE)"
deploy:
	scp -r study-life-smart-frontend/dist root@50.21.186.123:/home/study-life-smart-frontend
	scp -r test-server root@50.21.186.123:/home/study-life-smart-backend
