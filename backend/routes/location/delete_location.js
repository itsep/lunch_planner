const { pool } = require('../../lib/database')
const { NeedsUserConfirmation } = require('../../../shared/lib/error')
const { lunchspaceChannel } = require('../../lib/lunchspace_channels')

async function checkForFutureEvents(locationId) {
  const [futureEvents] = await pool.execute('SELECT * FROM join_up_at WHERE location_id = ? AND event_date >= CURDATE()', [locationId])
  if (futureEvents[0]) {
    throw new NeedsUserConfirmation('forceDelete not set')
  }
}

async function deleteLocation(req, res) {
  const { id: lunchspaceId } = req.lunchspace
  const { locationId, forceDelete } = req.body
  if (!forceDelete) {
    await checkForFutureEvents(locationId)
  }
  await pool.useConnection(async (conn) => {
    await conn.execute('DELETE FROM location WHERE id = ? AND lunchspace_id = ?', [locationId, lunchspaceId])
    await conn.execute(
      `DELETE join_up_at FROM join_up_at INNER JOIN location
      ON join_up_at.location_id = location.id
      WHERE join_up_at.location_id = ? AND location.lunchspace_id = ?`,
      [locationId, lunchspaceId]
    )
  })
  req.publishClient.publish(
    lunchspaceChannel(lunchspaceId),
    {
      action: 'removeLocation',
      locationId,
    },
  )
  return res.status(200).json({})
}

module.exports = {
  deleteLocation,
  checkForFutureEvents,
}
