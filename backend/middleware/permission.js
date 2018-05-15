const { pool } = require('../lib/database')
const { asyncMiddleware } = require('../lib/asyncMiddleware')
const { InputValidationError } = require('../lib/error')

async function checkPermission(req) {
  if (!req.token) {
    throw new Error('no cookie token defined')
  }
  const { userId } = req.token
  const { subdomain } = req.headers
  const result = await pool.useConnection(async (conn) => {
    const [lunchspaces] = await conn.execute('SELECT id as id, name as name FROM lunchspace WHERE subdomain = ?', [subdomain])
    if (lunchspaces.length === 0) {
      throw new InputValidationError('subdomain', 'Could not find a Lunchspace with the given subdomain')
    }
    const [lunchspace] = lunchspaces
    const [members] = await conn.execute('SELECT * FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspace.id])
    const [permission] = members
    if (permission) {
      return lunchspace
    }
    return false
  })
  if (result) {
    req.lunchspace = {
      id: result.id,
      name: result.name,
      subdomain,
    }
  } else {
    throw new Error('User is not authorized')
  }
}

module.exports = {
  checkPermission: asyncMiddleware(checkPermission),
}
