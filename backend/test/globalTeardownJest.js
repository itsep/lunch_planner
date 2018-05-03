
const { pool, dropDatabase } = require('../lib/database')

module.exports = async () => {
  dropDatabase(global.testDatabaseName)
  await pool.end()
}
