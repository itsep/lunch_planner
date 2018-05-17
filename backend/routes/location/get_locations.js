const { pool } = require('../../lib/database')

async function getLocationsAndParticipants(id, eventDate) {
  return pool.useConnection(async (conn) => {
    const [locations] = await conn.execute('SELECT id, name, coordinates FROM location WHERE lunchspace_id = ?', [id])
    locations.map((element) => {
      const location = element
      location.coordinates = { lat: location.coordinates.x, long: location.coordinates.y }
      return true
    })
    const [participants] = await conn.execute(`SELECT user_id as userId, location_id as locationId,
event_time as eventTime,
first_name as firstName, last_name as lastName, image_url as imageUrl
FROM event_participants WHERE lunchspace_id = ? AND event_date = ?`, [id, eventDate])
    console.log(participants)
    const participantsAtLocation = {}
    const locationsInLunchspace = []
    await participants.forEach((participant) => {
      if (locationsInLunchspace.indexOf(participant.locationId) > -1) {
        participantsAtLocation.locationId.push(participant)
      } else {
        locationsInLunchspace.push(participant.locationId)
        participantsAtLocation[participant.locationId] = [participant]
      }
    })
    console.log(participantsAtLocation)
    const result = {}
    locations.forEach((location) => {
      const participantsAtTimestamp = {}
      if (locationsInLunchspace.indexOf(location.id) > -1) {
        participantsAtLocation.location.id.forEach((participant) => {
          participantsAtTimestamp[participant.eventTime] = {
            firstName: participant.firstName,
            lastName: participant.lastName,
            imageUrl: participant.imageUrl,
            userId: participant.userId,
          }
        })
      }
      result[location.id] = {
        id: location.id,
        name: location.name,
        coordinates: location.coordinates,
        participantsAtTimestamp,
      }
    })
    return result
  })
}

async function getLocations(req, res) {
  const { date } = req.params
  const { id } = req.lunchspace
  const result = await getLocationsAndParticipants(id, date)
  result.user = await req.userPromise
  return res.status(200).json(result)
}

module.exports = {
  getLocations,
  getLocationsAndParticipants,
}
