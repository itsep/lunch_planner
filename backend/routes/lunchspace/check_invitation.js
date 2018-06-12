const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')

async function checkTokenAndGetLunchspaceId(token) {
  const [result] = await pool.execute('SELECT lunchspace_id AS lunchspaceId FROM invitation WHERE token = ?', [token])
  if (result[0]) {
    return result[0].lunchspaceId
  }
  const error = new InputValidationError(
    'token', `token is invalid: ${token}`,
    'invalidToken', { token },
  )
  error.status = 410
  throw error
}

async function getLunchspaceNameAndSubdomain(lunchspaceId) {
  const [result] = await pool.execute('SELECT name, subdomain FROM lunchspace WHERE id = ?', [lunchspaceId])
  if (result[0]) {
    return {
      name: result[0].name,
      subdomain: result[0].subdomain,
    }
  }
  throw new InputValidationError(
    'lunchspaceId', `there is no lunchspace with lunchspaceId ${lunchspaceId}`,
    'lunchspaceDoesNotExist', { lunchspaceId },
  )
}

async function checkInvitation(req, res) {
  const { token } = req.query
  const lunchspaceId = await checkTokenAndGetLunchspaceId(token)
  const lunchspace = await getLunchspaceNameAndSubdomain(lunchspaceId)
  const { firstName, lastName } = await req.userPromise
  const result = {
    lunchspace,
    firstName,
    lastName,
  }
  return res.status(200).json(result)
}

module.exports = {
  checkTokenAndGetLunchspaceId,
  checkInvitation,
  getLunchspaceNameAndSubdomain,
}
