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
  static fromErrorObject(errorObject) {
    return new this(errorObject)
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
    this.localizationKey = 'unexpectedDatabaseError'
  }

  toResponse(debug) {
    const response = super.toResponse(debug)
    if (debug) {
      response.sql = this.sql
      response.sqlState = this.sqlState
      response.sqlMessage = this.sqlMessage
    }
    return response
  }
  toLocalizedString(localizableStrings) {
    let localizedString = super.toLocalizedString(localizableStrings)
    if (this.sql || this.sqlState || this.sqlMessage) {
      localizedString += `
SQL State: ${this.sqlState}
SQLMessage: ${this.sqlMessage}
SQL: ${this.sql}`
    }
    return localizedString
  }
}

SQLError.name = 'SQLError'

module.exports = { SQLError }
