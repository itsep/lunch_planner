const config = require('config')
const { parseToken } = require('../../lib/authenticate')
const { removeSubscriptionsForSession } = require('../../lib/notification/web_subscription')

const tokenCookieName = config.get('token.cookieName')
const isProbablyAuthenticatedCookieName = config.get('token.isProbablyAuthenticatedCookieName')


function logout(req, res) {
  res.clearCookie(tokenCookieName)
  res.clearCookie(isProbablyAuthenticatedCookieName)
  const tokenString = req.cookies && req.cookies.lunch_planner_token
  if (tokenString) {
    const token = parseToken(tokenString)
    if (token.userId && token.sessionId) {
      removeSubscriptionsForSession(token.userId, token.sessionId)
    }
  }

  res.json({})
}

module.exports = {
  logout,
}
