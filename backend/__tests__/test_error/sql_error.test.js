const { to } = require('await-to-js')
const { pool } = require('../../lib/database/index')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { SQLError } = require('../../../shared/lib/error/sql_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('../../../shared/lib/error/localizable_error_test_suite')

describe('sql error', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
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
