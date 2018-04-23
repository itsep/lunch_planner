const jwt = require('jsonwebtoken')

function tokenValidation(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.log(err)
  }
  return undefined
}

function isAutorized(user) {
  return (user.perm && user.perm.admin)
}

function verifyAccount(req, res, next) {
  if (req.cookies && req.cookies.lunch_planner_token && req.cookies.lunch_planner_token.token) {
    const user = tokenValidation(req.cookies.lunch_planner_token.token)
    if (isAutorized(user)) {
      req.account = user
      return next()
    }
    next(new Error('User is not autorized'))
  }
  next(new Error('Authentification error'))
}

module.exports = {
  tokenValidation,
  verifyAccount,
}
