/* eslint no-console: 0 */
require('dotenv').load()
const mysql = require('mysql2/promise')

async function dropDatabase(databaseName) {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  })
  await conn.query('DROP DATABASE IF EXISTS ??', [databaseName])
  await conn.end()
}

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
  process.exit(1)
}

const databaseName = process.argv[2]
if (!databaseName) {
  console.error('No database name given')
  process.exit(1)
}
dropDatabase(databaseName).catch((error) => {
  console.error(error)
  process.exit(1)
})
