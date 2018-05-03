const { pool } = require('../../lib/database')

async function create(name, coordinates, lunchspaceId) {
  await pool.execute('INSERT INTO location (name, coordinates, lunchspace_id) ' +
    'VALUES (?,?,?)', [name, coordinates, lunchspaceId])
  return true
}

async function createLocation(req, res) {
  const { name, coordinates } = req.body
  const lunchspaceId = 2
  try {
    await create(name, coordinates, lunchspaceId)
    res.status(200).end()
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  createLocation,
}
