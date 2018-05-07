const { pool } = require('../../lib/database')
const { validLength } = require('../../lib/validation')

const minimumLength = 1
const maximumLength = 64

async function create(name, coordinates, lunchspaceId) {
  await pool.execute('INSERT INTO location (name, coordinates, lunchspace_id) ' +
    'VALUES (?,?,?)', [name, coordinates, lunchspaceId])
  return true
}

async function createLocation(req, res) {
  const { userId } = req.token
  const { coordinates, lunchspaceId } = req.body
  let { name } = req.body
  if (!validLength(name, maximumLength, minimumLength)) {
    return res.status(409).json({ error: 'Name must be between 1 and 64 characters long.' })
  }
  name = name.trim()
  try {
    await pool.execute('SELECT FROM member_of WHERE')
  }
  try {
    await create(name, coordinates, lunchspaceId)
  } catch (error) {
    throw error
  }
  return res.status(200).end()
}

module.exports = {
  create,
  createLocation,
}
