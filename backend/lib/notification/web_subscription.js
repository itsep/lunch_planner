const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')

function validateSubscription(subscription) {
  if (typeof subscription.endpoint !== 'string') {
    throw new InputValidationError('endpoint', 'endpoint must be url')
  }
  if (!subscription.keys) {
    throw new InputValidationError('keys', 'keys must be defined in subscription')
  }
  if (typeof subscription.keys.auth !== 'string') {
    throw new InputValidationError('auth', 'auth must be a string')
  }
  if (typeof subscription.keys.p256dh !== 'string') {
    throw new InputValidationError('p256dh', 'p256dh must be a string')
  }
}

async function removeSubscription(userId, subscription) {
  validateSubscription(subscription)
  return pool.execute(`DELETE FROM web_notification_subscription 
WHERE
user_id = ? AND
endpoint = ? AND
key_auth = ? AND
key_p256dh = ?`, [userId, subscription.endpoint, subscription.keys.auth, subscription.keys.p256dh])
}

async function addSubscription(userId, subscription, userAgent) {
  validateSubscription(subscription)
  return pool.execute(
    `REPLACE INTO web_notification_subscription
(user_id, endpoint, key_auth, key_p256dh, user_agent)
VALUES (?, ?, ?, ?, ?)`,
    [
      userId,
      subscription.endpoint,
      subscription.keys.auth,
      subscription.keys.p256dh,
      userAgent || null,
    ]
  )
}

module.exports = {
  removeSubscription,
  addSubscription,
}
