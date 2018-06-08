const config = require('config')
const { pool } = require('../../lib/database')
const { isValidSubdomain } = require('../../../shared/lib/subdomain')
const { validLength } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')

const subdomainBlacklist = config.get('subdomainBlacklist')

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

async function createLunchspace(userId, lunchspaceName, lunchspaceSubdomain) {
  const lunchspaceId = await create(lunchspaceName, lunchspaceSubdomain)
  await connect(userId, lunchspaceId, true)
  return lunchspaceId
}

function isSubdomainInBlacklist(subdomain) {
  const normalizedSubdomain = subdomain.toLowerCase()
  return subdomainBlacklist.indexOf(normalizedSubdomain) !== -1
}

async function createLunchspaceAndJoin(req, res) {
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
    throw new InputValidationError(
      'lunchspaceSubdomain', `Illegal Token in Subdomain. (${lunchspaceSubdomain})`,
      'illegalSubdomain', { lunchspaceSubdomain },
    )
  }
  if (isSubdomainInBlacklist(lunchspaceSubdomain)) {
    throw new InputValidationError(
      'lunchspaceSubdomain', `Lunchspace subdomain is not allowed because it is blacklisted. (${lunchspaceSubdomain})`,
      'subdomainAlreadyExists', { lunchspaceSubdomain },
    )
  }
  try {
    await createLunchspace(userId, lunchspaceName, lunchspaceSubdomain)
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new InputValidationError(
        'lunchspaceSubdomain', `Lunchspace subdomain already exists. (${lunchspaceSubdomain})`,
        'subdomainAlreadyExists', { lunchspaceSubdomain },
      )
    }
    throw error
  }
  return res.status(200).json({})
}

module.exports = {
  createLunchspaceAndJoin,
  createLunchspace,
  create,
  connect,
}
