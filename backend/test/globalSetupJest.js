
module.exports = async () => {
  global.testDatabaseName = await createTestDatabase(schemaPath)
  pool.changeDatabase(global.testDatabaseName)
  console.log(global.testDatabaseName)
}
