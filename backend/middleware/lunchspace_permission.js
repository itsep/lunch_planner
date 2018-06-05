const { pool } = require('../lib/database')
const { asyncExpressMiddleware, asyncSocketMiddleware } = require('../lib/async_middleware')
const { InputValidationError, AuthenticationError, AuthorizationError } = require('../../shared/lib/error')

async function checkLunchspacePermission(token, subdomain) {
  if (!token) {
    throw new AuthenticationError('no cookie token defined')
  }
  const { userId } = token
  const result = await pool.useConnection(async (conn) => {
    const [lunchspaces] = await conn.execute('SELECT id as id, name as name FROM lunchspace WHERE subdomain = ?', [subdomain])
    if (lunchspaces.length === 0) {
      throw new InputValidationError(
        'subdomain', `Could not find a Lunchspace with subdomain: ${subdomain}`,
        'illegalInput', { subdomain }
      )
    }
    const [lunchspace] = lunchspaces
    const [members] = await conn.execute('SELECT * FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspace.id])
    const [permission] = members
    if (permission) {
      return lunchspace
    }
    return false
  })
  if (!result) {
    throw new AuthorizationError(`User is has no authorisation for lunchspace ${subdomain}`)
  }
  return result
}

async function checkLunchspacePermissionOfRequest(req) {
  const { token } = req
  const { subdomain } = req.headers
  const lunchspace = await checkLunchspacePermission(token, subdomain)
  req.lunchspace = {
    id: lunchspace.id,
    name: lunchspace.name,
    subdomain,
  }
}
async function checkLunchspacePermissionOfSocket(socket) {
  const { token } = socket
  const { subdomain } = socket.request.headers
  const lunchspace = await checkLunchspacePermission(token, subdomain)
  // eslint-disable-next-line no-param-reassign
  socket.lunchspace = {
    id: lunchspace.id,
    name: lunchspace.name,
    subdomain,
  }
}

module.exports = {
  asyncCheckLunchspacePermissionOfRequest: checkLunchspacePermissionOfRequest,
  checkLunchspacePermissionOfRequest: asyncExpressMiddleware(checkLunchspacePermissionOfRequest),
  checkLunchspacePermissionOfSocket: asyncSocketMiddleware(checkLunchspacePermissionOfSocket),
}
