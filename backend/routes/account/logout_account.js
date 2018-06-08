const config = require('config')

const tokenCookieName = config.get('token.cookieName')
const isProbablyAuthenticatedCookieName = config.get('token.isProbablyAuthenticatedCookieName')


function logout(req, res) {
  res.clearCookie(tokenCookieName)
  res.clearCookie(isProbablyAuthenticatedCookieName)
  res.json({})
}

module.exports = {
  logout,
}
