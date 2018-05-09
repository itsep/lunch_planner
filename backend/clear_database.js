require('dotenv').load()
const { clearDatabaseAndImportTestDump } = require('./lib/database/util')

const dbName = 'lunch_planner'

clearDatabaseAndImportTestDump(dbName)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

