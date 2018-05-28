/**
 * @abstract
 */
class LocalizableError extends Error {
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
