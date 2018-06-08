const { asyncExpressMiddleware } = require('../lib/async_middleware')
const { AuthenticationError } = require('../../shared/lib/error')
const { pool } = require('../lib/database')

async function getLunchspacesForUser(userId) {
  return pool.execute(`SELECT name, subdomain
FROM lunchspace
INNER JOIN member_of ON lunchspace_id = lunchspace.id
WHERE user_id = ?`, [userId])
    .then(([lunchspaces]) => lunchspaces)
}

async function asyncGetLunchspaces(req) {
  if (!req.token) {
    throw new AuthenticationError('No token in request. The authentication middleware must be before the getLunchspaces middleware.')
  }
  const { userId } = req.token
  req.lunchspacesPromise = getLunchspacesForUser(userId)
}

module.exports = {
  getLunchspacesForUser,
  asyncGetLunchspaces,
  getLunchspaces: asyncExpressMiddleware(asyncGetLunchspaces),
}
