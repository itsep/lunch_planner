require('dotenv').load()
require('../shared/lib/promise_polyfill')
const { clearDatabaseAndImportTestDump } = require('./lib/database/util')

const dbName = 'lunch_planner'

clearDatabaseAndImportTestDump(dbName)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

