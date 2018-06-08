const jwt = require('jsonwebtoken')
const config = require('config')

const secret = process.env.JWT_SECRET
const cookieDomain = config.has('domain') && config.get('domain')
const tokenLifetime = config.get('token.lifetime')
const onlyHttps = config.get('token.onlyHttps')
const tokenCookieName = config.get('token.cookieName')
const isProbablyAuthenticatedCookieName = config.get('token.isProbablyAuthenticatedCookieName')

function stringifyToken(userId) {
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: tokenLifetime }
  )
  return token
}

function parseToken(token) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return undefined
  }
}

function setTokenOnResponse(res, token) {
  res.cookie(
    'lunch_planner_token',
    token,
    {
      domain: cookieDomain,
      maxAge: tokenLifetime,
      // only sends cookies on a https connection (only in production)
      secure: onlyHttps,
      // disables access to the cookie from javascript
      httpOnly: true,
      // disables cookies in an embedded content like an iframe
      sameSite: 'strict',
    }
  )
  // a cookie that lets the client know that it is probably authenticated
  // it does not include the token and can be accessed from javascript
  res.cookie('authenticated', 1, {
    domain: cookieDomain,
    maxAge: tokenLifetime,
    // only sends cookies on a https connection (only in production)
    secure: onlyHttps,
    // disables cookies in an embedded content like an iframe
    sameSite: 'strict',
  })
}

module.exports = {
  stringifyToken,
  parseToken,
  setTokenOnResponse,
}
