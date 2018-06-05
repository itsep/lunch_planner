git pull
npm install --prefix=backend
npm install --prefix=frontend
npm run build --prefix=frontend
npm run deploy --prefix=frontend
cd ./backend
pm2 stop rest-api
pm2 start services/rest-api.js --name rest-api
pm2 stop subscriber
pm2 start services/subscriber.js --name subscriber