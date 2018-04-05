require('dotenv').load()
const mysql = require('mysql')

if (!process.env.USERNAME || !process.env.PASSWORD) {
  console.error('No database username or no database password given.')
} else {
  module.exports = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABSE_USERNAME,
    password: process.env.DATABSE_PASSWORD,
    database: 'lunch_planner',
  })
}
