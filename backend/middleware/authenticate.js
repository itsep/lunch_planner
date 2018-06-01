const { asyncExpressMiddleware, asyncSocketMiddleware } = require('../lib/async_middleware')
const { parseToken } = require('../lib/authenticate')
const { isAuthorised } = require('../lib/authorisation')
const { AuthorizationError, AuthenticationError } = require('../../shared/lib/error')

function authentication(cookies) {
  if (!cookies || !cookies.lunch_planner_token) {
    throw new AuthenticationError('no cookie token defined')
  }
  const token = cookies.lunch_planner_token
  const tokenData = parseToken(token)
  if (!isAuthorised(tokenData)) {
    throw new AuthorizationError('User is not authorized')
  }
  return tokenData
}

async function authenticateRequest(req) {
  req.token = authentication(req.cookies)
}

async function authenticateSocket(socket) {
  // eslint-disable-next-line no-param-reassign
  socket.token = authentication(socket.request.cookies)
}

module.exports = {
  authenticateRequest: asyncExpressMiddleware(authenticateRequest),
  authenticateSocket: asyncSocketMiddleware(authenticateSocket),
}
