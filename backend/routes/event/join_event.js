const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')
const { InputValidationError } = require('../../lib/error')

async function create(userId, locationId, eventTime, eventDate) {
  await pool.execute('INSERT INTO join_up_at (user_id, location_id, event_time, event_date) ' +
    'VALUES (?, ?, ?, ?)', [userId, locationId, eventTime, eventDate])
}

// TODO: error for invalid inputs
async function createJoinEvent(req, res) {
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
  await create(userId, locationId, eventTime, eventDate)
  return res.status(200).end()
}

module.exports = {
  create,
  createJoinEvent,
}
