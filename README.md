# LunchPlanner
Website to plan lunch.

## Installation
### Database and Message Broker
Install [MariaDB](https://mariadb.com) and [redis](https://redis.io).
### Install Dependencies
```bash
npm install --prefix=shared
npm install --prefix=backend
npm install --prefix=frontend
```
## Configure Application
You need to create a `.env` file in the `backend` folder with the following content:

```
DATABASE_USERNAME=*your database username*
DATABASE_PASSWORD=*your database your password*
JWT_SECRET=*your jasonwebtoken secret*
SENDER_EMAIL=*your email address*
EMAIL_SERVICE=*your email service*
EMAIL_PASSWORD=*your email password*
```

## Start the application in Development mode
### Start backend
```bash
npm run start-all --prefix=backend
```
### Start frontend
```bash
npm run start --prefix=frontend
```

