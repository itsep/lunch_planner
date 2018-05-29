const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')
const { InputValidationError } = require('../../../shared/lib/error')

async function joinEvent(userId, locationId, eventTime, eventDate) {
  await pool.execute('INSERT INTO join_up_at (user_id, location_id, event_time, event_date) ' +
    'VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE user_id = user_id', [userId, locationId, eventTime, eventDate])
}

async function joinEventRoute(req, res) {
  const { userId } = req.token
  const { locationId, eventTime, eventDate } = req.body
  if (!validDate(eventDate)) {
    throw new InputValidationError(
      'eventDate', `Date must be an object with year, month and day. (${eventDate})`,
      'illegalInput', { eventDate }
    )
  }
  if (!validTime(eventTime)) {
    throw new InputValidationError(
      'eventTime', `Time must be an object with hour and minute. (${eventTime})`,
      'illegalInput', { eventTime }
    )
  }
  const eventTimeSQL = timeForSQL(eventTime)
  const eventDateSQL = dateForSQL(eventDate)
  await joinEvent(userId, locationId, eventTimeSQL, eventDateSQL)

  return res.status(200).json({})
}

module.exports = {
  joinEvent,
  joinEventRoute,
}
