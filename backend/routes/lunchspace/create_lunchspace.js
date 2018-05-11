const { pool } = require('../../lib/database')
const { isValidSubdomain } = require('../../../shared/lib/subdomain')
const { validLength } = require('../../lib/validation')
const { InputValidationError } = require('../../lib/error')

const minimumLength = 1
const maximumLength = 24

async function create(lunchspaceName, lunchspaceSubdomain) {
  const [result] = await pool.execute('INSERT INTO lunchspace (name, subdomain) ' +
      'VALUES (?,?)', [lunchspaceName, lunchspaceSubdomain])
  return result.insertId
}

async function connect(userId, lunchspaceId, isAdmin) {
  await pool.execute('INSERT INTO member_of (user_id, lunchspace_id, is_admin) ' +
      'VALUES (?,?,?)', [userId, lunchspaceId, isAdmin])
}

async function createLunchspace(req, res) {
  const { userId } = req.token
  let { lunchspaceName, lunchspaceSubdomain } = req.body
  if (!validLength(lunchspaceName, maximumLength, minimumLength)) {
    throw new InputValidationError('lunchspaceName', 'Length of lunchspace name must be between 1 and 24 characters.')
  }
  if (!validLength(lunchspaceSubdomain, maximumLength, minimumLength)) {
    throw new InputValidationError('lunchspaceSubdomain', 'Length of subdomain must be between 1 and 24 characters')
  }
  lunchspaceSubdomain = lunchspaceSubdomain.trim()
  lunchspaceName = lunchspaceName.trim()
  if (!isValidSubdomain(lunchspaceSubdomain)) {
    throw new InputValidationError('lunchspaceSubdomain', 'Illegal Token in Subdomain.')
  }
  try {
    const lunchspaceId = await create(lunchspaceName, lunchspaceSubdomain)
    await connect(userId, lunchspaceId, true)
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new InputValidationError('lunchspaceSubdomain', 'Lunchspace subdomain already exists.')
    }
    throw error
  }
  return res.status(200).end()
}

module.exports = {
  createLunchspace,
  create,
  connect,
}
