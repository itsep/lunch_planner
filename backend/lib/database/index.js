const mysql = require('mysql2/promise')
const fs = require('fs-nextra')
const { makeId } = require('../makeId')

if (!process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
  console.error('No database username or no database password given.')
  process.exit(1)
}

class MysqlPool {
  constructor(config) {
    this.config = config
    this.openPool(this.database)
  }
  openPool(database) {
    this.config.database = database
    this.pool = mysql.createPool(this.config)
  }

  get isClosed() {
    // eslint-disable-next-line no-underscore-dangle
    return this.pool.pool._closed
  }
  get database() {
    return this.config.database
  }
  async getConnection() {
    return this.pool.getConnection()
  }
  async query(...args) {
    return this.pool.query(...args)
  }
  async execute(...args) {
    return this.pool.execute(...args)
  }
  async useConnection(consumer) {
    const conn = await this.pool.getConnection()
    return consumer(conn).finally(() => conn.release())
  }
  /**
   * changes the database for new connections. closes the current pool and joinEvent a new one
   * @param database {String} - database name
   */
  async changeDatabase(database) {
    const oldPool = this.pool
    this.openPool(database)
    // pool.end() should work if it is called multiple times but does not.
    // as a workaround we check if the pool is already closed
    // eslint-disable-next-line no-underscore-dangle
    if (!oldPool.pool._closed) {
      await oldPool.end()
    }
  }

  async end() {
    if (!this.isClosed) {
      await this.pool.end()
    }
  }
}

const pool = new MysqlPool({
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'lunch_planner',
})


async function createMultiStatementConnection(withoutDatabase) {
  return mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: withoutDatabase ? undefined : 'lunch_planner',
    multipleStatements: 'true',
  })
}

async function createMultiStatementConnectionWithoutSelectedDatabase() {
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

