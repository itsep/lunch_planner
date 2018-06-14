const { pool } = require('../../lib/database')
const { NeedsUserConfirmation } = require('../../../shared/lib/error')
const { joinUpAt } = require('../../lib/lunchspace_channels')
const { toEventDate, toEventDateId, toEventTimeFromString } = require('../../../shared/lib/event')

async function passAdminRightsAndCheckForDeletion(userId, lunchspaceId, forceDelete) {
  const toDelete = await pool.useConnection(async (conn) => {
    const [result] = await conn.execute('SELECT is_admin AS isAdmin FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspaceId])
    if (result[0].isAdmin) {
      const [member] = await conn.execute('SELECT user_id AS userId From member_of WHERE is_admin = ? AND lunchspace_id = ?', [false, lunchspaceId])
      if (member[0]) {
        await conn.execute('UPDATE member_of SET is_admin = ? WHERE user_id = ? AND lunchspace_id = ?', [true, member[0].userId, lunchspaceId])
        await conn.execute('UPDATE member_of SET is_admin = ? WHERE user_id = ? AND lunchspace_id = ?', [false, userId, lunchspaceId])
        return false
      }
      if (!forceDelete) {
        throw new NeedsUserConfirmation('forceDelete not set')
      }
      return true
    }
    return false
  })
  return toDelete
}

async function leaveEvents(userId, lunchspaceId) {
  await pool.execute(
    `DELETE join_up_at FROM join_up_at INNER JOIN location
ON join_up_at.location_id = location.id
WHERE join_up_at.user_id = ? AND location.lunchspace_id = ?`,
    [userId, lunchspaceId]
  )
}

async function leaveLunchspace(userId, lunchspaceId) {
  await pool.execute('DELETE FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspaceId])
}

async function deleteLunchspace(lunchspaceId) {
  await pool.execute('DELETE FROM lunchspace WHERE id = ?', [lunchspaceId])
}

async function leaveLunchspaceRoute(req, res) {
  const { userId } = req.token
  const { id } = req.lunchspace
  const { forceDelete } = req.body
  const { firstName, lastName, imageUrl } = await req.userPromise
  const toDelete = await passAdminRightsAndCheckForDeletion(userId, id, forceDelete)
  const [events] = await pool.execute(
    `SELECT * FROM join_up_at INNER JOIN location
ON join_up_at.location_id = location.id
WHERE join_up_at.user_id = ? AND location.lunchspace_id = ?
AND join_up_at.event_date >= CURDATE()`,
    [userId, id]
  )
  events.forEach((event) => {
    req.publishClient.publish(
      joinUpAt(
        id,
        event.location_id,
        toEventDateId(toEventDate(event.event_date)),
        event.event_time
      ),
      {
        action: 'leaveEvent',
        locationId: event.location_id,
        eventDate: toEventDate(event.event_date),
        eventTime: toEventTimeFromString(event.event_time),
        participant: {
          userId,
          firstName,
          lastName,
          imageUrl,
        },
      }
    )
  })
  const promiseArray = [
    leaveLunchspace(userId, id), leaveEvents(userId, id),
  ]
  if (toDelete) {
    promiseArray.push(deleteLunchspace(id))
  }
  await Promise.all(promiseArray)
  return res.status(200).json({})
}

module.exports = {
  leaveLunchspace,
  leaveEvents,
  deleteLunchspace,
  passAdminRightsAndCheckForDeletion,
  leaveLunchspaceRoute,
}
