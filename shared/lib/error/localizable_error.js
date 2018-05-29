/**
 * @abstract
 */
class LocalizableError extends Error {
  /**
   * creates a new localizable error from and a plain javascript object
   * (probably send from the server)
   * @param errorObject {Object}
   * @returns {LocalizableError}
   */
  static fromErrorObject(errorObject) {
    const localizableError = new this()
    Object.keys(errorObject).forEach((key) => {
      localizableError[key] = errorObject[key]
    })
    return localizableError
  }
  constructor(message) {
    super(message)
    this.code = LocalizableError.code.DEFAULT
    this.name = LocalizableError.name
    this.status = 500
    this.localizationKey = ''
    this.localizationValues = undefined
  }

  toResponse(debug) {
    const response = {
      name: this.name,
      localizationKey: this.localizationKey,
      localizationValues: this.localizationValues,
    }
    if (debug) {
      response.code = this.code
      response.status = this.status
      response.message = this.message
    }
    return response
  }
  toLocalizedString(localizableStrings) {
    if (!this.localizationKey) {
      return this.message || this.name
    }
    return localizableStrings.formatString(
      localizableStrings[this.localizationKey],
      this.localizationValues
    )
  }
}

LocalizableError.name = 'LocalizableError'

LocalizableError.code = {
  DEFAULT: 'LOCALIZABLE_ERROR',
}

module.exports = { LocalizableError }
