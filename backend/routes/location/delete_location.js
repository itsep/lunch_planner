const { pool } = require('../../lib/database')
const { NeedsUserConfirmation } = require('../../../shared/lib/error')

async function deleteLocation(req, res) {
  const { locationId, forceDelete } = req.body
  if (!forceDelete) {
    throw new NeedsUserConfirmation('forceDelete not set')
  }
  await pool.useConnection(async (conn) => {
    await conn.execute('DELETE FROM location WHERE id = ?', [locationId])
    await conn.execute('DELETE FROM join_up_at WHERE location_id = ?', [locationId])
  })
  return res.status(200).json({})
}

module.exports = {
  deleteLocation,
}
