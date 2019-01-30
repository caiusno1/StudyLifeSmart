all:	build deploy
build:	
	"$(MAKE)" -C "study-life-smart-frontend"
deploy:
	scp -r study-life-smart-frontend/dist root@50.21.186.123:/home/study-life-smart-frontend
	scp test-server/server.js root@50.21.186.123:/home/study-life-smart-backend/server.js
	scp authentication-server/auth-server.js root@50.21.186.123:/home/authentication-server/auth-server.js
	scp authentication-server/database.db root@50.21.186.123:/home/authentication-server/database.db
	scp authentication-server/package.json root@50.21.186.123:/home/authentication-server/package.json
	scp calendar-server/calendar-server.js root@50.21.186.123:/home/calendar-server/calendar-server.js
	scp calendar-server/package.json root@50.21.186.123:/home/calendar-server/package.json
run:	
	node authentication-server/auth-server.js &
	node calendar-server/calendar-server.js &
	node test-server/server.js &
	cd study-life-smart-frontend
