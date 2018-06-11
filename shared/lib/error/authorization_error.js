const { LocalizableError } = require('./localizable_error')

class AuthorizationError extends LocalizableError {
  constructor(message) {
    super(message)
    this.identifier = AuthorizationError.identifier
    this.status = 403
    this.code = 'AUTHORIZATION_ERROR'
    this.localizationKey = 'authorizationError'
  }
}

AuthorizationError.identifier = 'AuthorizationError'

module.exports = { AuthorizationError }
