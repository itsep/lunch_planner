const fs = require('fs-nextra')
const { createMultiStatementConnection } = require('./index')

async function consumeConnection(connPromise, consumer) {
  const conn = await connPromise
  return consumer(conn).finally(() => conn.end())
}

async function clearDatabase(conn, dbSchema, dbName) {
  await conn.query('DROP DATABASE IF EXISTS ??', [dbName])
  await conn.query("CREATE DATABASE ?? CHARACTER SET 'utf8mb4' COLLATE 'utf8_unicode_ci'", [dbName])
  await conn.query('USE ??', [dbName])
  await conn.query(dbSchema.toString())
}

async function readDbSchema() {
  return fs.readFile('../database/schema.sql')
}

async function readTestDataDump() {
  return fs.readFile('../database/test_data_dump.sql')
}

async function importTestData(conn, testDataDump) {
  await conn.query(testDataDump.toString())
}
async function updateTestDataTimeAndDate(conn) {
  await conn.execute('UPDATE join_up_at SET event_date = NOW()')
}

async function clearDatabaseAndImportTestDump(dbName) {
  const connPromise = createMultiStatementConnection(true)
  const dbSchemaPromise = readDbSchema()
  const testDataDumpPromise = readTestDataDump()
  return consumeConnection(connPromise, async (conn) => {
    await clearDatabase(conn, await dbSchemaPromise, dbName)
    await importTestData(conn, await testDataDumpPromise)
    await updateTestDataTimeAndDate(conn)
  })
}

module.exports = {
  clearDatabaseAndImportTestDump,
  importTestData,
  clearDatabase,
  readDbSchema,
  readTestDataDump,
  consumeConnection,
}
