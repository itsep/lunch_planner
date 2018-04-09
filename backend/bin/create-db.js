require('dotenv').load()
const fs = require('fs-nextra')
const mysql = require('mysql2/promise')

const path = '../database/schema.sql'

function makeid() {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let i

  for (i = 0; i < 10; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

async function getConnection() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: 'true',
  })
  return conn
}

async function createDatabase(conn, databaseName) {
  await conn.query('CREATE DATABASE ??', [databaseName])
  await conn.query('USE ??', [databaseName])
}

async function importSchema(conn) {
  const schema = await fs.readFile(path)
  await conn.query(schema.toString())
}

async function createDBAndImportSchema(conn) {
  const databaseName = makeid()
  return createDatabase(conn, databaseName)
    .then(() => importSchema(conn))
    .then(() => databaseName)
    .catch((error) => {
      if (error.sqlState === 'HY000') {
        return createDBAndImportSchema(conn)
      }
      throw error
    })
}

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
  process.exit(1)
}

async function createTestDatabase() {
  const conn = await getConnection()
  const dbName = await createDBAndImportSchema(conn)
  await conn.end()
  return dbName
}

createTestDatabase().catch((error) => {
  console.error(error)
  process.exit(1)
})

