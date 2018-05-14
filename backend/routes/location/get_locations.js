const { pool } = require('../../lib/database')

async function getLocationsAndParticipants(id) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT id, name, coordinates FROM location WHERE lunchspace_id = ?', [id])
    locations.map((element) => {
      const location = element
      location.coordinates = { lat: location.coordinates.x, long: location.coordinates.y }
      return true
    })
    const [participants] = await conn.execute('SELECT user_id as userId, location_id as locationId,' +
      ' event_time as eventTime, event_date as eventDate,' +
      ' first_name as firstName, last_name as lastName, image_url as imageUrl' +
      ' FROM event_participants WHERE lunchspace_id = ?', [id])
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
