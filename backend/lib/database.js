require('dotenv').load()
const mysql = require('mysql2/promise')
const fs = require('fs-nextra')
const { makeId } = require('./makeId')

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
  process.exit(1)
}

class MysqlPool {
  constructor(config) {
    this.config = config
    this.openPool(config.database)
  }
  openPool(database) {
    this.pool = mysql.createPool(Object.assign({}, this.config, { database }))
  }
  async getConnection() {
    return this.pool.getConnection()
  }
  async execute(...args) {
    const conn = await this.pool.getConnection()
    return conn.execute(...args)
      .finally(() => conn.release())
  }
  async useConnection(consumer) {
    const conn = await this.pool.getConnection()
    return consumer(conn).finally(() => conn.release())
  }
  /**
   * changes the database for new connections. closes the current pool and create a new one
   * @param database {String} - database name
   */
  async changeDatabase(database) {
    const oldPool = this.pool
    this.openPool(database)
    oldPool.end()
    console.log("change database to", database)
  }

  async end() {
    return this.pool.end()
  }
}

const pool = new MysqlPool({
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'lunch_planner',
})

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
  await conn.end()
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

