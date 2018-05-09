const { pool } = require('../../lib/database')
const { validLength } = require('../../lib/validation')

const minimumLength = 1
const maximumLength = 64

async function create(name, coordinates, lunchspaceId) {
  await pool.execute('INSERT INTO location (name, coordinates, lunchspace_id) ' +
    'VALUES (?, POINT(?, ?), ?)', [name, coordinates.lat, coordinates.long, lunchspaceId])
}

async function createLocation(req, res) {
  const { coordinates } = req.body
  let { name } = req.body
  const { id } = req.lunchspace
  if (!validLength(name, maximumLength, minimumLength)) {
    return res.status(409).json({ error: 'Name must be between 1 and 64 characters long.' })
  }
  name = name.trim()
  if (!coordinates.lat || !coordinates.long) {
    return res.status(500).json({ error: 'Illegal coordinates.' })
  }
  try {
    await create(name, coordinates, id)
  } catch (error) {
    return res.status(500).json({ error: 'Location could not be created.' })
  }
  return res.status(200).end()
}

module.exports = {
  create,
  createLocation,
}
