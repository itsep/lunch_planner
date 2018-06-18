const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')

function validateToken(token) {
  if (typeof token !== 'string' || token.length === 0) {
    throw new InputValidationError('token', 'token must be of type string and not empty')
  }
}

async function removeRegistrationForSession(userId, sessionId) {
  return pool.execute(`DELETE FROM ios_notification_registration 
WHERE
user_id = ? AND
session_id = ?`, [userId, sessionId])
}

async function addRegistration(userId, sessionId, token) {
  validateToken(token)
  return pool.execute(
    `REPLACE INTO ios_notification_registration
(user_id, session_id, token)
VALUES (?, ?, ?)`,
    [
      userId,
      sessionId,
      token,
    ]
  )
}

module.exports = {
  addRegistration,
  removeRegistrationForSession,
}
