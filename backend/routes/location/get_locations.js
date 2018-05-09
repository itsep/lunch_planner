const { pool } = require('../../lib/database')

async function getLocations(req, res) {
  const { id } = req.lunchspace
  const [result] = await pool.execute('SELECT join_up_at.*, location.name, location.coordinates FROM join_up_at LEFT JOIN location ON join_up_at.location_id = location.id WHERE location.lunchspace_id = ?', [id])

}