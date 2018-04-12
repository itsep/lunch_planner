const { pool, createTestDatabase, dropDatabase } = require('../lib/database')

const schemaPath = '../database/schema.sql'

let testDatabaseName
before(async () => {
  testDatabaseName = await createTestDatabase(schemaPath)
  pool.changeDatabase(testDatabaseName)
})

after(async () => {
  dropDatabase(testDatabaseName)
  await pool.end()
})
