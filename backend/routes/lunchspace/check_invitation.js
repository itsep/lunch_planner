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

async function getLunchspaceName(lunchspaceId) {
  const [result] = await pool.execute('SELECT name AS lunchspaceName FROM lunchspace WHERE id = ?', [lunchspaceId])
  if (result[0]) {
    return result[0].lunchspaceName
  }
  throw new InputValidationError(
    'lunchspaceId', `there is no lunchspace with lunchspaceId ${lunchspaceId}`,
    'lunchspaceDoesNotExist', { lunchspaceId },
  )
}

async function checkInvitation(req, res) {
  const { token } = req.query
  const lunchspaceId = await checkTokenAndGetLunchspaceId(token)
  const lunchspaceName = await getLunchspaceName(lunchspaceId)
  const { firstName, lastName } = await req.userPromise
  const result = {
    lunchspaceName,
    firstName,
    lastName,
  }
  return res.status(200).json(result)
}

module.exports = {
  checkTokenAndGetLunchspaceId,
  checkInvitation,
  getLunchspaceName,
}
