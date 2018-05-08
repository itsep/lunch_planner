const fs = require('fs-nextra')
const { createMultiStatementConnection } = require('./index')

async function clearDatabase(conn, dbSchema, dbName) {
  await conn.query('DROP DATABASE IF EXISTS ??', [dbName])
  await conn.query('CREATE DATABASE ??', [dbName])
  await conn.query('USE ??', [dbName])
  await conn.query(dbSchema.toString())
  return conn
}

async function importTestData(conn, testDataDump) {
  await conn.query(testDataDump.toString())
  return conn
}

async function clearDatabaseAndImportTestDump(dbName) {
  const connPromise = createMultiStatementConnection(true)
  const dbSchemaPromise = fs.readFile('../database/schema.sql')
  const testDataDumpPromise = fs.readFile('../database/test_data_dump.sql')
  connPromise.then(async (conn) => {
    await clearDatabase(conn, await dbSchemaPromise, dbName)
    await importTestData(conn, await testDataDumpPromise)
  }).finally(() => connPromise.then(conn => conn.end()))
}

module.exports = {
  clearDatabaseAndImportTestDump,
}
