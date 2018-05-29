const { LocalizableError } = require('./localizable_error')

class UnknownError extends LocalizableError {
  /**
   * Converts a raw javascript error to an `UnknownError` if it is not already a `LocalizableError`
   * @param {error} error
   * @returns {LocalizableError}
   */
  static convertIfNeeded(error) {
    if (error instanceof LocalizableError) {
      return error
    }
    return this.fromRawError(error)
  }

  /**
   * converts a raw javascript error to an `UnknownError`
   * @param {Error} error
   * @returns {UnknownError}
   */
  static fromRawError(error) {
    const localizableError = new UnknownError(error.message)
    localizableError.stack = error.stack
    localizableError.code = error.code
    return localizableError
  }
  constructor(message) {
    super(message)
    this.name = UnknownError.name
    this.status = 500
    this.code = 'UNKNOWN_ERROR'
    if (this.message) {
      this.localizationKey = 'unknownErrorWithMessage'
      this.localizationValues = {
        message: this.message,
      }
    } else {
      this.localizationKey = 'unknownError'
    }
  }
}

UnknownError.name = 'UnknownError'

module.exports = { UnknownError }
