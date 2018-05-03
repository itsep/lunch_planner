const { pool, createTestDatabase } = require('../lib/database')

const schemaPath = '../database/schema.sql'

module.exports = async () => {
  global.testDatabaseName = await createTestDatabase(schemaPath)
  pool.changeDatabase(global.testDatabaseName)
}
