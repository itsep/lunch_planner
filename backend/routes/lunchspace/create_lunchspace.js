const { pool } = require('../../lib/database')
const { valid } = require('../../lib/subdomain')

async function create(lunchspaceName, lunchspaeUrl) {
  return pool.useConnection(async (conn) => {
    await conn.execute('INSERT INTO lunchspace (name, url) ' +
      'VALUES (?,?)', [lunchspaceName, lunchspaeUrl])
    return conn.execute('SELECT id FROM lunchspace WHERE url = ?', [lunchspaeUrl])
  })
}

async function connect(userId, lunchspaceId, isAdmin) {
  await pool.execute('INSERT INTO member_of (user_id, lunchspace_id, is_admin) ' +
      'VALUES (?,?)', [userId, lunchspaceId, isAdmin])
}

async function createLunchspace(req, res) {
  const { lunchspaceName, lunchspaceUrl } = req.body
  if (valid.isValidSubdomain(lunchspaceUrl) && lunchspaceName !== '') {
    try {
      const lunchspaceId = await create(lunchspaceName, lunchspaceUrl)
      const userId = req.user
      await connect(userId, lunchspaceId, true)
      res.status(200).end()
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Lunchspace URL already exists.' })
      } else throw error
    }
  }
}

module.export = {
  createLunchspace,
  create,
  connect,
}
