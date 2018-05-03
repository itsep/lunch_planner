const jwt = require('jsonwebtoken')

function tokenValidation(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return undefined
  }
}

function isAutorized(user) {
  return (user && user.perm && user.perm.admin)
}

function authenticate(req, res, next) {
  if (!req.cookies || !req.cookies.lunch_planner_token) {
    next(new Error('no cookie token defined'))
    return
  }
  const token = req.cookies.lunch_planner_token
  const user = tokenValidation(token)
  if (!isAutorized(user)) {
    next(new Error('User is not autorized'))
  }

  req.user = user
  next()
}

module.exports = {
  tokenValidation,
  authenticate,
}
