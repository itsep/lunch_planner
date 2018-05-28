const { UnknownError } = require('./unknown_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('./localizable_error_test_suite')

describe('UnknownError', () => {
  describe('from string', () => {
    addAllLocalizableErrorTestsToCurrentSuite(async () => new UnknownError('Unexpected Error occurred'))
  })
  describe('from raw error', () => {
    addAllLocalizableErrorTestsToCurrentSuite(async () => UnknownError.fromRawError(new Error('Something unexpected did happen')))
  })
})
