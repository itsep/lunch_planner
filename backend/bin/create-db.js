require('dotenv').load()
const mysql = require('mysql')


function makeid() {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let i

  for (i = 0; i < 10; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
const databaseName = makeid()

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
} else {
  module.exports = {}
  module.exports.pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: databaseName,
  })
  module.exports.createMultiStatementConnection = () => mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: databaseName,
    multipleStatements: 'true',
  })
}

console.log(databaseName)
