require('dotenv').load()
const mysql = require('mysql2/promise')
const fs = require('fs-nextra')
const { makeId } = require('./makeId')

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

pool.execute = async function execute(...args) {
  const conn = await this.getConnection()
  return conn.execute(...args)
    .finally(() => conn.release())
}

pool.useConnection = async function useConnection(consumer) {
  const conn = await this.getConnection()
  return consumer(conn).finally(() => conn.release())
}
/**
 * changes the database for new connections! Call this function before you use the pool.
 * @param dbName {String} - database name
 */
pool.changeDatabase = function changeDatabase(dbName) {
  module.exports.pool.pool.config.connectionConfig.database = dbName
}

function createMultiStatementConnection(withoutDatabase) {
  return mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: withoutDatabase ? undefined : 'lunch_planner',
    multipleStatements: 'true',
  })
}

function createMultiStatementConnectionWithoutSelectedDatabase() {
  return mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: 'true',
  })
}

async function createDatabase(conn, databaseName) {
  await conn.query('CREATE DATABASE ??', [databaseName])
  await conn.query('USE ??', [databaseName])
}

async function importSchema(conn, schemaPath) {
  const schema = await fs.readFile(schemaPath)
  await conn.query(schema.toString())
}

async function createTestDatabaseRecursive(conn, schemaPath) {
  const databaseName = makeId(10)
  return createDatabase(conn, databaseName)
    .then(() => importSchema(conn, schemaPath))
    .then(() => databaseName)
    .catch((error) => {
      // Database already exists
      if (error.sqlState === 'HY000') {
        // retry with a different name
        return createTestDatabaseRecursive(conn)
      }
      throw error
    })
}

async function createTestDatabase(schemaPath) {
  const conn = await createMultiStatementConnectionWithoutSelectedDatabase()
  const dbName = await createTestDatabaseRecursive(conn, schemaPath)
  conn.end()
  return dbName
}


async function dropDatabase(databaseName) {
  const conn = await createMultiStatementConnectionWithoutSelectedDatabase()
  await conn.query('DROP DATABASE IF EXISTS ??', [databaseName])
  await conn.end()
}


module.exports = {
  pool,
  createMultiStatementConnection,
  createTestDatabase,
  dropDatabase,
}

