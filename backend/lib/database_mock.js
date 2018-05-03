const { pool, createTestDatabase, dropDatabase } = require('../lib/database')

const schemaPath = '../database/schema.sql'

let testDatabaseName
async function createMockDatabase() {
  testDatabaseName = await createTestDatabase(schemaPath)
  pool.changeDatabase(global.testDatabaseName)
}

async function dropMockDatabase() {
  dropDatabase(testDatabaseName)
  await pool.end()
}

module.exports = {
  createMockDatabase,
  dropMockDatabase,
}
