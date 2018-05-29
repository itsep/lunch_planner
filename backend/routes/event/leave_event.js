const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')
const { InputValidationError } = require('../../../shared/lib/error')

async function leaveEvent(userId, locationId, eventTime, eventDate) {
  await pool.execute(
    'DELETE FROM join_up_at WHERE user_id = ? AND location_id = ? AND event_time = ? AND event_date = ?',
    [userId, locationId, eventTime, eventDate]
  )
}

async function leaveEventRoute(req, res) {
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
  await leaveEvent(userId, locationId, eventTimeSQL, eventDateSQL)
  return res.status(200).json({})
}

module.exports = {
  leaveEventRoute,
  leaveEvent,
}