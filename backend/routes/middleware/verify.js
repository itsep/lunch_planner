const jwt = require('jsonwebtoken')

function isTokenValid(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

function verifyAccount(req, res, next) {
  const cookie = req.cookies.lunch_planner_token.token
  if (cookie && isTokenValid(cookie.token)) {
    next()
    return
  }
  next(new Error('Authentification error'))
}

module.exports = {
  verifyAccount,
}
