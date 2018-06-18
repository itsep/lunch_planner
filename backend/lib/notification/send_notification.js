const { sendWebNotifications } = require('./send_web_push')
const { sendIosNotifications } = require('./send_ios_push')

async function sendNotificationToUsers(lunchspace, userIds, notification) {
  return Promise.all([
    sendIosNotifications(userIds, notification),
    sendWebNotifications(lunchspace, userIds, notification),
  ]).then(results => results.reduce((countA, countB) => countA + countB, 0))
}

module.exports = {
  sendNotificationToUsers,
}
