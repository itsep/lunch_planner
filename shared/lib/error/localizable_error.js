/**
 * @abstract
 */
class LocalizableError extends Error {
  /**
   * creates a new localizable error from and a plain javascript object (probably send from the server)
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
    this.localisationKey = ''
    this.localisationValues = undefined
  }

  toResponse() {
    return {
      name: this.name,
      localisationKey: this.localisationKey,
      localisationValues: this.localisationValues,
    }
  }
}

LocalizableError.name = 'LocalizableError'

LocalizableError.code = {
  DEFAULT: 'LOCALIZABLE_ERROR',
}

module.exports = { LocalizableError }
