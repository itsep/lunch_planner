const { to } = require('await-to-js')
const { pool } = require('../database')
const { createMockDatabase, dropMockDatabase } = require('../database/mock')
const { SQLError } = require('./sql_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('./localizable_error_test_suite')

describe('sql error', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  it('should throw a raw sql error and it should be convertible to a SQLError', async () => {
    const [error, result] = await to(pool.execute('SELECT * FROM table_that_does_not_exists'))
    expect(error).toBeDefined()
    expect(result).toBeUndefined()
    const sqlError = new SQLError(error)
    expect(sqlError).toBeDefined()
  })
  addAllLocalizableErrorTestsToCurrentSuite(async () => {
    const [error, result] = await to(pool.execute('SELECT * FROM table_that_does_not_exists'))
    expect(error).toBeDefined()
    expect(result).toBeUndefined()
    return new SQLError(error)
  })
})
