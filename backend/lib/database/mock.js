const { pool, createTestDatabase, dropDatabase } = require('./index')

const schemaPath = '../database/schema.sql'

let testDatabaseName
async function createMockDatabase() {
  testDatabaseName = await createTestDatabase(schemaPath)
  await pool.changeDatabase(testDatabaseName)
}

async function dropMockDatabase() {
  await dropDatabase(testDatabaseName)
  await pool.end()
}

function getDatabaseName() {
  return pool.database
}

module.exports = {
  createMockDatabase,
  dropMockDatabase,
  getDatabaseName,
}
