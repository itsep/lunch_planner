const webPush = require('web-push')
const { zip } = require('zip-array')
const { pool } = require('../database')
const { removeSubscription } = require('./web_subscription')
const { getLanguageCodeOrDefault } = require('../i18n')

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

async function sendWebNotifications(lunchspace, userIds, notification) {
  if (userIds.length === 0) {
    return 0
  }
  const [rawUserSubscriptions] = await pool.query(`SELECT 
user_id as userId,
language,
endpoint,
key_auth as auth,
key_p256dh as p256dh
FROM web_notification_subscription 
JOIN user ON user.id = user_id
WHERE 
user_id IN (?) AND 
lunchspace_id = ?`, [userIds, lunchspace.id])
  const userIdsForSubscriptions = rawUserSubscriptions.map(sub => sub.userId)
  const userLanguages = rawUserSubscriptions.map(user => getLanguageCodeOrDefault(user.language))
  const subscriptions = rawUserSubscriptions.map(sub => ({
    endpoint: sub.endpoint,
    keys: {
      auth: sub.auth,
      p256dh: sub.p256dh,
    },
  }))


  const requests = zip(subscriptions, userLanguages).map(([sub, language]) => {
    const payload = notification.toWebMessagePayload(language)
    return webPush.sendNotification(sub, payload)
  })
  const results = zip(requests, subscriptions, userIdsForSubscriptions)
    .map(([request, userSubscription, userId]) => request.catch((error) => {
      // 404 or 410 indicates that the subscription is no longer valid
      if (error.statusCode === 404 || error.statusCode === 410) {
        return removeSubscription(userId, userSubscription)
      }
      throw error
    }))
  return Promise.all(results).then(() => results.length)
}


module.exports = {
  sendWebNotifications,
}
