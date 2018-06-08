const { pool } = require('../../lib/database')

async function getLocationsAndParticipants(lunchspaceId, eventDate) {
  const { locations, participants } = await pool.useConnection(async (conn) => {
    // eslint-disable-next-line no-shadow
    const [locations] = await conn.execute('SELECT id, name, coordinates FROM location WHERE lunchspace_id = ?', [lunchspaceId])
    // eslint-disable-next-line no-shadow
    const [participants] = await conn.execute(`SELECT user_id as userId, location_id as locationId,
event_time as eventTime,
first_name as firstName, last_name as lastName, image_url as imageUrl
FROM event_participants WHERE lunchspace_id = ? AND event_date = ?`, [lunchspaceId, eventDate])
    return { locations, participants }
  })

  const locationsInLunchspace = locations.map(location => location.id)
  const locationMap = {}
  locations.forEach((location) => {
    const { id, coordinates, ...locationWithoutId } = location
    const { x, y } = coordinates
    locationWithoutId.coordinates = { lat: x, long: y }
    locationWithoutId.participantsAtTimestamp = {}
    locationMap[location.id] = locationWithoutId
  })
  const userMap = {}
  participants.forEach((participant) => {
    const {
      locationId, userId, eventTime, ...user
    } = participant
    // add user to user map
    userMap[userId] = user
    // add user to location at event time
    const { participantsAtTimestamp } = locationMap[locationId]
    participantsAtTimestamp[eventTime] = participantsAtTimestamp[eventTime] || []
    participantsAtTimestamp[eventTime].push(userId)
  })

  return {
    locationsInLunchspace,
    locations: locationMap,
    users: userMap,
  }
}

async function getLocations(req, res) {
  const { date } = req.query
  const { id } = req.lunchspace
  const result = await getLocationsAndParticipants(id, date)
  result.user = await req.userPromise
  result.lunchspaces = await req.lunchspacesPromise
  return res.status(200).json(result)
}

module.exports = {
  getLocations,
  getLocationsAndParticipants,
}
