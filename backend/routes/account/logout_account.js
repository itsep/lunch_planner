const { parseToken, clearTokenOnResponse } = require('../../lib/authenticate')
const { removeSubscriptionsForSession } = require('../../lib/notification/web_subscription')
const { removeRegistrationForSession } = require('../../lib/notification/ios_registration')


function logout(req, res) {
  clearTokenOnResponse(res)
  const tokenString = req.cookies && req.cookies.lunch_planner_token
  if (tokenString) {
    const token = parseToken(tokenString)
    if (token.userId && token.sessionId) {
      removeSubscriptionsForSession(token.userId, token.sessionId)
      removeRegistrationForSession(token.userId, token.sessionId)
    }
  }

  res.json({})
}

module.exports = {
  logout,
}
