const jwt = require('jsonwebtoken')

function tokenValidation(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return undefined
  }
}

function isAutorized(token) {
  return (token && token.userId)
}

function authenticate(req, res, next) {
  if (!req.cookies || !req.cookies.lunch_planner_token) {
    next(new Error('no cookie token defined'))
    return
  }
  const token = req.cookies.lunch_planner_token
  const tokenData = tokenValidation(token)
  if (!isAutorized(tokenData)) {
    next(new Error('User is not authorized'))
  }

  req.token = tokenData
  next()
}

module.exports = {
  tokenValidation,
  authenticate,
}
