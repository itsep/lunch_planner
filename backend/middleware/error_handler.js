const { SQLError, UnknownError } = require('../../shared/lib/error')

function convertRawSQLErrorToLocalizableSQLError(err, req, res, next) {
  next(SQLError.convertIfNeeded(err))
}

// express treats functions with 4 arguments as error handlers
// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  const localizedError = UnknownError.convertIfNeeded(err)
  // eslint-disable-next-line no-console
  console.error(localizedError)
  res
    .status(localizedError.status)
    .json(localizedError.toResponse())
}

module.exports = {
  convertRawSQLErrorToLocalizableSQLError,
  handleError,
}
