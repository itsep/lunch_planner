const { pool } = require('../../lib/database')

async function getLocationsAndMembers(id) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT * FROM location WHERE lunchspace_id = ?', [id])
    const [members] = await conn.execute('SELECT * FROM location_member WHERE lunchspace_id = ?', [id])
    const result = { locations, members }
    return result
  })
}

async function getLocations(req, res) {
  const { id } = req.lunchspace
  const result = await getLocationsAndMembers(id)
  res.status(200).json(result)
}

module.exports = {
  getLocations,
  getLocationsAndMembers,
}
