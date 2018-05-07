const { pool } = require('../../lib/database')
const { isValidSubdomain } = require('../../../shared/lib/subdomain')

const minimumLength = 1
const maximumLength = 24

async function create(lunchspaceName, lunchspaceSubdomain) {
  const result = await pool.execute('INSERT INTO lunchspace (name, url) ' +
      'VALUES (?,?)', [lunchspaceName, lunchspaceSubdomain])
  return result[0].insertId
}

async function connect(userId, lunchspaceId, isAdmin) {
  await pool.execute('INSERT INTO member_of (user_id, lunchspace_id, is_admin) ' +
      'VALUES (?,?,?)', [userId, lunchspaceId, isAdmin])
}

async function createLunchspace(req, res) {
  const { userId } = req.token
  let { lunchspaceName, lunchspaceSubdomain } = req.body
  if (typeof lunchspaceName === 'string') {
    lunchspaceName = lunchspaceName.trim()
  }
  lunchspaceSubdomain = typeof lunchspaceSubdomain === 'string' ?
    lunchspaceSubdomain.trim() : ''

  if (!isValidSubdomain(lunchspaceSubdomain)) {
    return res.status(409).json({ error: 'Illegal Token in Subdomain.' })
  }
  if (lunchspaceSubdomain < minimumLength) {
    return res.status(409).json({ error: 'Subdomain too short.' })
  }
  if (lunchspaceSubdomain.length > maximumLength) {
    return res.status(409).json({ error: 'Subdomain too long.' })
  }
  if (typeof lunchspaceName !== 'string' || lunchspaceName.length < minimumLength) {
    return res.status(409).json({ error: 'Name too short.' })
  }
  if (lunchspaceName.length > maximumLength) {
    return res.status(409).json({ error: 'Name too long.' })
  }
  try {
    const lunchspaceId = await create(lunchspaceName, lunchspaceSubdomain)
    console.log(userId, lunchspaceId)
    await connect(userId, lunchspaceId, true)
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Lunchspace subdomain already exists.' })
    } throw error
  }
  return res.status(200).end()
}

module.exports = {
  createLunchspace,
  create,
  connect,
}
