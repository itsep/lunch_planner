const jwt = require('jsonwebtoken')

function tokenValidation(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.log(err)
  }
  return undefined
}

function verifyAccount(req, res, next) {
  const cookie = req.cookies.lunch_planner_token
  const user = tokenValidation(cookie.token)
  if (cookie && user) {
    req.account = user
    next()
    return
  }
  next(new Error('Authentification error'))
}

module.exports = {
  tokenValidation,
  verifyAccount,
}
