const { LocalizableError } = require('./localizable_error')

class InputValidationError extends LocalizableError {
  constructor(property, message, localizationKey, localizationValues) {
    super(message)
    this.identifier = InputValidationError.identifier
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

InputValidationError.identifier = 'InputValidationError'

module.exports = { InputValidationError }
