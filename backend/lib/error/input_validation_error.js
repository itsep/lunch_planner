const { LocalizableError } = require('./localizable_error')

class InputValidationError extends LocalizableError {
  constructor(property, message) {
    super(message)
    this.name = InputValidationError.name
    this.status = 409
    this.property = property
  }

  toResponse() {
    const response = super.toResponse()
    response.property = this.property
    return response
  }
}

InputValidationError.name = 'InputValidationError'

module.exports = { InputValidationError }
