const { sendWebNotifications } = require('./send_web_push')

async function sendNotificationToUsers(userIds, notification) {
  await sendWebNotifications(userIds, notification)
}

module.exports = {
  sendNotificationToUsers,
}
