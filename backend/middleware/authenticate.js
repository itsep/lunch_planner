const { parseToken } = require('../lib/authenticate')
const { isAuthorised } = require('../lib/authorisation')
const { AuthorizationError, AuthenticationError } = require('../../shared/lib/error')

function authenticate(req, res, next) {
  if (!req.cookies || !req.cookies.lunch_planner_token) {
    next(new AuthenticationError('no cookie token defined'))
    return
  }
  const token = req.cookies.lunch_planner_token
  const tokenData = parseToken(token)
  if (!isAuthorised(tokenData)) {
    next(new AuthorizationError('User is not authorized'))
  }

  req.token = tokenData
  next()
}

module.exports = {
  authenticate,
}
