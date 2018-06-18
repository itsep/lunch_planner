const { pool } = require('./database')
const { someoneElseJoinedMyEvent, allLeftMyEvent } = require('./lunchspace_notification')
const { sendNotificationToUsers } = require('./notification/send_notification')

async function sendSomeoneElseJoinedMyEventNotification(
  lunchspace,
  locationId,
  eventDateSQL,
  eventTimeSQL,
  joinedUser
) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT id, name FROM location WHERE id = ?', [locationId])
    const [location] = locations

    const [users] = await conn.execute(`SELECT user_id as id
FROM join_up_at
WHERE 
location_id = ? AND
event_date = ? AND
event_time = ? AND
user_id != ?
`, [locationId, eventDateSQL, eventTimeSQL, joinedUser.id])
    const totalUserInEvent = users.length + 1
    const notification = someoneElseJoinedMyEvent(
      lunchspace,
      location,
      eventTimeSQL,
      joinedUser,
      totalUserInEvent
    )
    const userIds = users.map(user => user.id)
    await sendNotificationToUsers(lunchspace, userIds, notification)
  })
}

async function sendAllLeftMyEventNotificationIfNeeded(
  lunchspace,
  locationId,
  eventDateSQL,
  eventTimeSQL
) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT id, name FROM location WHERE id = ?', [locationId])
    const [location] = locations

    const [users] = await conn.execute(`SELECT user_id as id
FROM join_up_at
WHERE 
location_id = ? AND
event_date = ? AND
event_time = ?
`, [locationId, eventDateSQL, eventTimeSQL])
    if (users.length !== 1) {
      return 0
    }
    const userIds = users.map(user => user.id)
    const notification = allLeftMyEvent(lunchspace, location, eventTimeSQL)
    return sendNotificationToUsers(lunchspace, userIds, notification)
  })
}

module.exports = {
  sendSomeoneElseJoinedMyEventNotification,
  sendAllLeftMyEventNotificationIfNeeded,
}
