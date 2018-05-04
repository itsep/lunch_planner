const { pool } = require('../../lib/database')
const { valid } = require('../../lib/subdomain')

async function create(lunchspaceName, lunchspaceUrl) {
  return pool.useConnection(async (conn) => {
    const [result] = await conn.execute('INSERT INTO lunchspace (name, url) ' +
      'VALUES (?,?)', [lunchspaceName, lunchspaceUrl])
    console.log('result: ', result[0])
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

module.exports = {
  createLunchspace,
  create,
  connect,
}
