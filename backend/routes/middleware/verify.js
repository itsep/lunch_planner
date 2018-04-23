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
  const token = req.cookies.lunch_planner_token
  if (!token) {
    next(new Error('no cookie token defined'))
    return
  }

  const user = tokenValidation(token)
  if (!user) {
    next(new Error('token not valid'))
  }
  req.account = user
  next()
}

module.exports = {
  tokenValidation,
  verifyAccount,
}
