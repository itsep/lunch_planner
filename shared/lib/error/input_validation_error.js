const { LocalizableError } = require('./localizable_error')

class InputValidationError extends LocalizableError {
  constructor(property, message, localizationKey, localizationValues) {
    super(message)
    this.name = InputValidationError.name
    this.status = 409
    this.property = property
    this.localizationKey = localizationKey
    this.localizationValues = localizationValues
  }

  toResponse(debug) {
    const response = super.toResponse(debug)
    response.property = this.property
    return response
  }
}

InputValidationError.name = 'InputValidationError'

module.exports = { InputValidationError }
