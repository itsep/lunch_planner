const { LocalizableError } = require('./localizable_error')

class AuthenticationError extends LocalizableError {
  constructor(message) {
    super(message)
    this.identifier = AuthenticationError.identifier
    this.status = 401
    this.code = 'AUTHENTICATION_ERROR'
    this.localizationKey = 'authenticationError'
  }
}

AuthenticationError.identifier = 'AuthenticationError'

module.exports = { AuthenticationError }
