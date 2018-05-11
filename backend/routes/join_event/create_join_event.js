const { pool } = require('../../lib/database')

async function create(userId, locationId, eventTime, eventDate) {
  const [result] = await pool.execute('INSERT INTO join_up_at (user_id, location_id, event_time, event_date) ' +
    'VALUES (?, ?, TIME(?:?), DATE(?-?-?)', [userId, locationId, eventTime.hour, eventTime.minute, eventDate.year, eventDate.month, eventDate.day])
  return result.insertId
}

async function createJoinEvent(req, res) {
  const {
    userId,
    locationId,
    eventTime,
    eventDate,
  } = req.body
  await create(userId, locationId, eventTime, eventDate)
  return res.status(200).end()
}

module.exports = {
  create,
  createJoinEvent,
}
