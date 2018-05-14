const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')
const { InputValidationError } = require('../../lib/error')

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
    throw new InputValidationError('eventDate', 'Date must be of type date.')
  }
  if (!validTime(eventTime)) {
    throw new InputValidationError('eventDate', 'Date must be of type time.')
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
