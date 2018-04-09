require('dotenv').load()
const mysql = require('mysql2/promise')

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
  process.exit(1)
}

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'lunch_planner',
})
/**
 * changes the database for new connections! Call this function before you use the pool.
 * @param dbName {String} - database name
 */
pool.changeDatabase = function changeDatabase(dbName) {
  module.exports.pool.pool.config.connectionConfig.database = dbName
}

function createMultiStatementConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'lunch_planner',
    multipleStatements: 'true',
  })
}

module.exports = {
  pool,
  createMultiStatementConnection,
}

