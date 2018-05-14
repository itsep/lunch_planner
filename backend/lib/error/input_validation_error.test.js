const { InputValidationError } = require('./input_validation_error')
const { addAllLocalizableErrorTestsToCurrentSuite } = require('./localizable_error_test_suite')

describe('InputValidationError', () => {
  addAllLocalizableErrorTestsToCurrentSuite(async () => new InputValidationError('name', 'length is to short'))
})
