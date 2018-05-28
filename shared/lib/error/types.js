const localizableErrorTypes = [
  require('./authentication_error'),
  require('./input_validation_error'),
  require('./unknown_error'),
]

const nameToTypeMap = localizableErrorTypes.reduce((map, errorType) => {
  map[errorType.name] = errorType
}, {})

module.exports = {
  types,
  nameToTypeMap,
}
