const LocalizableError = require('./localizable_error')
const UnknownError = require('unknown_error')
const { nameToTypeMap } = require('./types')


function toLocalizableError(errorObject) {
  // errorObject is not of type object
  if (typeof errorObject !== 'object') {
    console.error('`toLocalizableError` called with error which is not of type object. Was called with:', errorObject)
    if(typeof  errorObject === 'string') {
      return new UnknownError(errorObject)
    } else {
      return new UnknownError()
    }
  }

  // already a localizable error
  if (errorObject instanceof LocalizableError) {
    return errorObject
  }

  // raw javascript error
  if(errorObject instanceof Error) {
    return UnknownError.fromRawError(errorObject)
  }

  // can be converted to an localizable error type
  const localizableType = nameToTypeMap[errorObject.name]
  if(localizableType) {
    return localizableType.fromErrorObject(errorObject)
  }

  // something unknown, needs investigation
  console.error('unknown object given to `toLocalizableError`, needs investigation:', errorObject)
  if(typeof errorObject.message === 'string') {
    return new UnknownError(errorObject.message)
  } else {
    return new UnknownError(errorObject)
  }
}

module.exports = {
  toLocalizableError,
}
