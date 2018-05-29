const { AuthorizationError } = require('./authorization_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('./localizable_error_test_suite')

describe('AuthorizationError', () => {
  addAllLocalizableErrorTestsToCurrentSuite(async () => new AuthorizationError('token is not defined in header'))
})
