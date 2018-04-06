require('dotenv').load()
const mysql = require('mysql2/promise')

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
} else {
  module.exports = {}
  module.exports.pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'lunch_planner',
  })
  module.exports.createMultiStatementConnection = () => mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'lunch_planner',
    multipleStatements: 'true',
  })
}
