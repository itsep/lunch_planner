const { pool } = require('../../lib/database')
const { validDate, validTime } = require('../../lib/validation')
const { timeForSQL, dateForSQL } = require('../../lib/formatation')
const { toEventTimeId, toEventDateId } = require('../../../shared/lib/event')
const { InputValidationError } = require('../../../shared/lib/error')
const { joinUpAt } = require('../../lib/lunchspace_channels')
const { sendAllLeftMyEventNotificationIfNeeded } = require('../../lib/send_lunchspace_notification')

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

  const { id: lunchspaceId } = req.lunchspace
  const { firstName, lastName, imageUrl } = await req.userPromise
  req.publishClient.publish(
    joinUpAt(lunchspaceId, locationId, toEventDateId(eventDate), toEventTimeId(eventTime)),
    {
      action: 'leaveEvent',
      locationId,
      eventDate,
      eventTime,
      participant: {
        userId,
        firstName,
        lastName,
        imageUrl,
      },
    }
  )
  sendAllLeftMyEventNotificationIfNeeded(req.lunchspace, locationId, eventDateSQL, eventTimeSQL)
  return res.status(200).json({})
}

module.exports = {
  leaveEventRoute,
  leaveEvent,
}
