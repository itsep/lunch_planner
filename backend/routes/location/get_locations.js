const { pool } = require('../../lib/database')

async function getLocationsAndParticipants(id) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT * FROM location WHERE lunchspace_id = ?', [id])
    locations.map((element) => {
      const location = element
      location.coordinates = { lat: location.coordinates.x, long: location.coordinates.y }
      return true
    })
    const [participants] = await conn.execute('SELECT * FROM event_participants WHERE lunchspace_id = ?', [id])
    const result = { locations, participants }
    return result
  })
}

async function getLocations(req, res) {
  const { id } = req.lunchspace
  const result = await getLocationsAndParticipants(id)
  return res.status(200).json(result)
}

module.exports = {
  getLocations,
  getLocationsAndParticipants,
}
