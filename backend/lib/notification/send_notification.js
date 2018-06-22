const { sendWebNotificationsToLunchspace, sendWebNotifications } = require('./send_web_push')
const { sendIosNotifications } = require('./send_ios_push')

async function sendNotificationToUsersInLunchspace(lunchspace, userIds, notification) {
  return Promise.all([
    sendIosNotifications(userIds, notification),
    sendWebNotificationsToLunchspace(lunchspace, userIds, notification),
  ]).then(results => results.reduce((countA, countB) => countA + countB, 0))
}

async function sendNotificationsToUsers(userIds, notification) {
  return Promise.all([
    sendIosNotifications(userIds, notification),
    sendWebNotifications(userIds, notification),
  ]).then(results => results.reduce((countA, countB) => countA + countB, 0))
}

module.exports = {
  sendNotificationsToUsers,
  sendNotificationToUsersInLunchspace,
}
