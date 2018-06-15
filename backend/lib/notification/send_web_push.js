const webPush = require('web-push')
const { zip } = require('zip-array')
const { pool } = require('../database')
const { removeSubscription } = require('./web_subscription')

webPush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

async function sendWebNotifications(userIds, notification) {
  const [rawUserSubscriptions] = await pool.query(`SELECT 
user_id as userId,
endpoint,
key_auth as auth,
key_p256dh as p256dh
FROM web_notification_subscription WHERE user_id IN (?)`, [userIds])
  const userIdsForSubscriptions = rawUserSubscriptions.map(sub => sub.userId)
  const subscriptions = rawUserSubscriptions.map(sub => ({
    endpoint: sub.endpoint,
    keys: {
      auth: sub.auth,
      p256dh: sub.p256dh,
    },
  }))

  const payload = notification.toWebMessagePayload()
  const requests = subscriptions.map(sub => webPush.sendNotification(sub, payload))
  const results = zip(requests, subscriptions, userIdsForSubscriptions)
    .map(([request, userSubscription, userId]) => request.catch((error) => {
      // 404 or 410 indicates that the subscription is no longer valid
      if (error.statusCode === 404 || error.statusCode === 410) {
        return removeSubscription(userId, userSubscription)
      }
      throw error
    }))
  return Promise.all(results)
}


module.exports = {
  sendWebNotifications,
}
