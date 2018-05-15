const { AuthenticationError } = require('./authentication_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('./localizable_error_test_suite')

describe('AuthenticationError', () => {
  addAllLocalizableErrorTestsToCurrentSuite(async () => new AuthenticationError('token is not defined in header'))
})
