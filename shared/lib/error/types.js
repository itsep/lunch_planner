const { AuthorizationError } = require('./authorization_error')
const { AuthenticationError } = require('./authentication_error')
const { InputValidationError } = require('./input_validation_error')
const { SQLError } = require('./sql_error')
const { UnknownError } = require('./unknown_error')

const types = [
  AuthorizationError,
  AuthenticationError,
  InputValidationError,
  SQLError,
  UnknownError,
]
const nameToTypeMap = {}
types.forEach((errorType) => {
  nameToTypeMap[errorType.name] = errorType
})

module.exports = {
  types,
  nameToTypeMap,
}
