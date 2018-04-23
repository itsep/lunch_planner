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

function verifyAccount(req, res, next) {
  if (!req.cookies || !req.cookies.lunch_planner_token) {
    next(new Error('no cookie token defined'))
    return
  }
  const token = req.cookies.lunch_planner_token
  const user = tokenValidation(token)
  if (!isAutorized(user)) {
    next(new Error('User is not autorized'))
  }

  req.account = user
  next()
}

module.exports = {
  tokenValidation,
  verifyAccount,
}
