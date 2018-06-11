const { AuthorizationError } = require('./authorization_error')
const { AuthenticationError } = require('./authentication_error')
const { InputValidationError } = require('./input_validation_error')
const { SQLError } = require('./sql_error')
const { UnknownError } = require('./unknown_error')
const { NeedsUserConfirmation } = require('./needs_user_confirmation')

const types = [
  AuthorizationError,
  AuthenticationError,
  InputValidationError,
  SQLError,
  UnknownError,
  NeedsUserConfirmation,
]

function getNameForType(name) {
  return types.find(errorType => errorType.name === name)
}

module.exports = {
  types,
  getNameForType,
}
