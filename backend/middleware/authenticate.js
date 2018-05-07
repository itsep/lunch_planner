const { parseToken } = require('../lib/authenticate')
const { isAuthorised } = require('../lib/authorisation')

function authenticate(req, res, next) {
  if (!req.cookies || !req.cookies.lunch_planner_token) {
    next(new Error('no cookie token defined'))
    return
  }
  const token = req.cookies.lunch_planner_token
  const tokenData = parseToken(token)
  if (!isAuthorised(tokenData)) {
    next(new Error('User is not authorized'))
  }

  req.token = tokenData
  next()
}

module.exports = {
  authenticate,
}
