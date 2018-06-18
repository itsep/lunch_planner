const apn = require('apn')
const { zip } = require('zip-array')
const { pool } = require('../database')

const apnProvider = new apn.Provider({
  token: {
    key: './Lunchspace_APN_GW74B8WT7K.p8',
    keyId: 'GW74B8WT7K',
    teamId: 'XKQRPFVM7Z',
  },
})

async function sendIosNotifications(userIds, notification) {
  if (userIds.length === 0) {
    return 0
  }
  const [rawUserRegistrations] = await pool.query(`SELECT 
user_id as userId,
language,
token
FROM ios_notification_registration
JOIN user ON user.id = user_id
WHERE 
user_id IN (?)`, [userIds])
  // const userIdsForSubscriptions = rawUserRegistrations.map(sub => sub.userId)
  const userLanguages = rawUserRegistrations.map(user => user.language)
  const tokens = rawUserRegistrations.map(registration => registration.token)


  const requests = zip(tokens, userLanguages).map(([token, language]) => {
    const note = notification.toIOSNotification(language)
    return apnProvider.send(note, token)
  })

  return Promise.all(requests).then(() => requests.length)
}

module.exports = {
  sendIosNotifications,
}
