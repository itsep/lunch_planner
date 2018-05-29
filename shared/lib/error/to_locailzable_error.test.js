const { LocalizableError } = require('./localizable_error')
const { AuthorizationError } = require('./authorization_error')
const { AuthenticationError } = require('./authentication_error')
const { InputValidationError } = require('./input_validation_error')
const { UnknownError } = require('./unknown_error')
const { toLocalizableError } = require('./to_locailzable_error')

describe('toLocalizableError', () => {
  it('should transform arguments which are not objects to `UnknownError`s', () => {
    expect(toLocalizableError(1)).toBeInstanceOf(UnknownError)
    expect(toLocalizableError('what?!')).toBeInstanceOf(UnknownError)
    expect(toLocalizableError('')).toBeInstanceOf(UnknownError)
    expect(toLocalizableError(undefined)).toBeInstanceOf(UnknownError)
    expect(toLocalizableError(null)).toBeInstanceOf(UnknownError)
    expect(toLocalizableError(true)).toBeInstanceOf(UnknownError)
    expect(toLocalizableError(false)).toBeInstanceOf(UnknownError)
  })
  it('should NOT transform a LocalizableError', () => {
    const localizableError = new UnknownError('Hello World')
    expect(toLocalizableError(localizableError)).toEqual(localizableError)
  })
  it('should transform a plain javascript error to a LocalizableError', () => {
    const plainJavaScriptError = new Error('Plain JavaScript error')
    const localizableError = toLocalizableError(plainJavaScriptError)
    expect(localizableError).toBeInstanceOf(LocalizableError)
    expect(localizableError.message).toEqual(plainJavaScriptError.message)
  })
  it('should transfrom a LocalizableError like object to a LocalizableError', () => {
    expect(toLocalizableError(new UnknownError().toResponse()))
      .toBeInstanceOf(UnknownError)
    expect(toLocalizableError(new AuthenticationError().toResponse()))
      .toBeInstanceOf(AuthenticationError)
    expect(toLocalizableError(new AuthorizationError().toResponse()))
      .toBeInstanceOf(AuthorizationError)
    expect(toLocalizableError(new InputValidationError('password', 'invalid password').toResponse()))
      .toBeInstanceOf(InputValidationError)
  })
  it('should transform an Object with an unknown error name to an UnknownError', () => {
    expect(toLocalizableError({ name: 'some error name that will never exists' })).toBeInstanceOf(UnknownError)
  })
  it('should transform an random Object to an UnknownError', () => {
    const randomErrorObject = toLocalizableError({ message: 'some random error message' })
    expect(randomErrorObject).toBeInstanceOf(UnknownError)
    expect(randomErrorObject.message).toEqual(randomErrorObject.message)
    expect(toLocalizableError({ randomProperty: 'some random value' })).toBeInstanceOf(UnknownError)
  })
})