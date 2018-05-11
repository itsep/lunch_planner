const { LocalizableError } = require('./localizable_error')

test('create localizeable error with message', () => {
  const error = new LocalizableError('error message')
  expect(error.message).toEqual('error message')
})
