const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')

async function leave(userId, locationId, eventTime, eventDate) {
  await pool.execute(
    'DELETE FROM join_up_at WHERE user_id = ? AND location_id = ? AND event_time = ? AND event_date = ?',
    [userId, locationId, eventTime, eventDate]
  )
}

async function leaveEvent(req, res) {
  const { userId } = req.token
  const { locationId } = req.body
  let { eventTime, eventDate } = req.body
  if (!validDate(eventDate)) {
    res.status(500)
  }
  if (!validTime(eventTime)) {
    res.status(500)
  }
  eventTime = timeForSQL(eventTime)
  eventDate = dateForSQL(eventDate)
  await leave(userId, locationId, eventTime, eventDate)
  return res.status(200).end()
}

module.exports = {
  leaveEvent,
  leave,
}
