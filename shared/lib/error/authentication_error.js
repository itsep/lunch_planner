const { LocalizableError } = require('./localizable_error')

class AuthenticationError extends LocalizableError {
  constructor(message) {
    super(message)
    this.name = AuthenticationError.name
    this.status = 401
    this.code = 'AUTHENTICATION_ERROR'
    this.localizationKey = 'authenticationError'
  }
}

AuthenticationError.name = 'AuthenticationError'

module.exports = { AuthenticationError }
