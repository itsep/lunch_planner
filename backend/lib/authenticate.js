const jwt = require('jsonwebtoken')
const config = require('config')
const uuidv4 = require('uuid/v4')

const secret = process.env.JWT_SECRET
const cookieDomain = config.has('token.domain') && config.get('token.domain')
const tokenLifetime = config.get('token.lifetime')
const onlyHttps = config.get('token.onlyHttps')
const tokenCookieName = config.get('token.cookieName')
const isProbablyAuthenticatedCookieName = config.get('token.isProbablyAuthenticatedCookieName')

function stringifyToken(userId, sessionId = uuidv4()) {
  const token = jwt.sign(
    {
      userId,
      sessionId,
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

function clearTokenOnResponse(res) {
  res.clearCookie(tokenCookieName, {
    path: '/',
    domain: cookieDomain,
  })
  res.clearCookie(isProbablyAuthenticatedCookieName, {
    path: '/',
    domain: cookieDomain,
  })
}

function setTokenOnResponse(res, token) {
  res.cookie(
    tokenCookieName,
    token,
    {
      path: '/',
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
  res.cookie(
    isProbablyAuthenticatedCookieName,
    1,
    {
      path: '/',
      domain: cookieDomain,
      maxAge: tokenLifetime,
      // only sends cookies on a https connection (only in production)
      secure: onlyHttps,
      // disables cookies in an embedded content like an iframe
      sameSite: 'strict',
    }
  )
}

module.exports = {
  stringifyToken,
  parseToken,
  setTokenOnResponse,
  clearTokenOnResponse,
}
