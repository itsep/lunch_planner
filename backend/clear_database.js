require('dotenv').load()
const { createMultiStatementConnection } = require('./lib/database')
const fs = require('fs-nextra')

const dbName = 'lunch_planner'

const connPromise = createMultiStatementConnection(true)
const dbSchemaPromise = fs.readFile('../database/schema.sql')
const testDataDumpPromise = fs.readFile('../database/test_data_dump.sql')

async function clearDatabase() {
  const [conn, dbSchema] = await Promise.all([connPromise, dbSchemaPromise])

  await conn.query('DROP DATABASE IF EXISTS ??', [dbName])
  await conn.query('CREATE DATABASE ??', [dbName])
  await conn.query('USE ??', [dbName])
  await conn.query(dbSchema.toString())
  return conn
}

async function importTestData() {
  const [conn, testDataDump] = await Promise.all([connPromise, testDataDumpPromise])
  await conn.query(testDataDump.toString())
  return conn
}

clearDatabase()
  .then(importTestData)
  .then(conn => conn.end())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

