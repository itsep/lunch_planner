const { createMultiStatementConnection } = require('./lib/database')
const fs = require('fs-nextra')

const dbName = 'lunch_planner'

const connPromise = createMultiStatementConnection(true)
const dbSchemaPromise = fs.readFile('../database/schema.sql')

async function clearDatabase() {
  const [conn, dbSchema] = await Promise.all([connPromise, dbSchemaPromise])

  await conn.query('DROP DATABASE IF EXISTS ??', [dbName])
  await conn.query('CREATE DATABASE ??', [dbName])
  await conn.query('USE ??', [dbName])
  await conn.query(dbSchema.toString())
  return conn
}

clearDatabase()
  .then(conn => conn.end())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

