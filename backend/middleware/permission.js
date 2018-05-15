const { pool } = require('../lib/database')

async function checkPermission(req, res, next) {
  if (!req.token) {
    next(new Error('no cookie token defined'))
    return
  }
  const { userId } = req.token
  const { subdomain } = req.body
  const result = await pool.useConnection(async (conn) => {
    const [lunchspaces] = await conn.execute('SELECT id as id, name as name FROM lunchspace WHERE subdomain = ?', [subdomain])
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
    next()
  } else {
    next(new Error('User is not authorized'))
  }
}

module.exports = {
  checkPermission,
}
