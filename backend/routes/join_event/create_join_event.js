const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')

async function create(userId, locationId, eventTime, eventDate) {
  await pool.execute('INSERT INTO join_up_at (user_id, location_id, event_time, event_date) ' +
    'VALUES (?, ?, ?, ?)', [userId, locationId, eventTime, eventDate])
}

function timeForSQL(time) {
  const eventTimeHour = time.hour.toString().length === 2 ? time.hour : `0${time.hour}`
  const eventTimeMinute = time.minute.toString().length === 2 ? time.minute : `0${time.minute}`
  return `${eventTimeHour}:${eventTimeMinute}`
}

function dateForSQL(date) {
  const eventDateYear = date.year.toString()
  const eventDateMonth = date.month.toString().length === 2 ? date.month.minute : `0${date.month.minute}`
  const eventDateDay = date.day.toString().length === 2 ? date.day.minute : `0${date.day.minute}`
  return `${eventDateYear}-${eventDateMonth}-${eventDateDay}`
}

//TODO: error for invalid inputs
async function createJoinEvent(req, res) {
  const { userId, locationId } = req.body
  let { eventTime, eventDate } = req.body
  if (!validateDate(eventDate)){
    res.status(500)
  }
  if (!validateTime(eventTime)){
    res.status(500)
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
