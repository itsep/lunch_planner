const { pool, createTestDatabase, dropDatabase } = require('../lib/database')

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

module.exports = {
  createMockDatabase,
  dropMockDatabase,
}
