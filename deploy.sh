#!/bin/bash
# exit on error of first command
set -e

# update current branch
git pull
# install dependencies
npm install --prefix=backend
npm install --prefix=frontend
# build frontend
npm run build --prefix=frontend
# deploy frontend to nginx www folder
npm run deploy --prefix=frontend

# stop current backend and start new one
cd ./backend
pm2 startOrReload ecosystem.config.js --env=production
