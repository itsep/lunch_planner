const { LocalizableError } = require('./localizable_error')

class SQLError extends LocalizableError {
  static isRawSQLError(error) {
    return !!error.sql || !!error.sqlState || !!error.sqlMessage
  }
  static convertIfNeeded(error) {
    if (this.isRawSQLError(error)) {
      return new SQLError(error)
    }
    return error
  }
  constructor(rawSqlError) {
    super(rawSqlError.message)
    this.name = SQLError.name
    this.status = 500
    this.stack = rawSqlError.stack
    this.code = rawSqlError.code
    this.sql = rawSqlError.sql
    this.sqlState = rawSqlError.sqlState
    this.sqlMessage = rawSqlError.sqlMessage
    this.localisationKey = 'UNEXPECTED_DATABASE_ERROR'
  }
}

SQLError.name = 'SQLError'

module.exports = { SQLError }
