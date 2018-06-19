const { pool } = require('./database')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array)
  }
}

async function isMember(userId, lunchspaceId) {
  const [result] = await pool.execute('SELECT * FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspaceId])
  if (result[0]) {
    return true
  }
  return false
}

async function isAdmin(userId, lunchspaceId) {
  const [result] = await pool.execute('SELECT is_admin AS isAdmin FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspaceId])
  return result[0].isAdmin === 1
}
async function isName(userId, firstName, lastName) {
  const [result] = await pool.execute('SELECT first_name AS firstName, last_name AS lastName FROM user WHERE id = ?', [userId])
  return (result[0].firstName === firstName && result[0].lastName === lastName)
}

async function lunchspaceExists(lunchspaceId) {
  const [result] = await pool.execute('SELECT * FROM lunchspace WHERE id = ?', [lunchspaceId])
  if (result[0]) {
    return true
  }
  return false
}

async function locationExists(locationId) {
  const [result] = await pool.execute('SELECT * FROM location WHERE id = ?', [locationId])
  if (result[0]) {
    return true
  }
  return false
}

async function getLunchspaceIdsForUser(userId) {
  return pool.execute('SELECT lunchspace_id as id FROM member_of WHERE user_id = ?', [userId])
    .then(([lunchspaces]) => lunchspaces)
}

module.exports = {
  asyncForEach,
  isMember,
  isAdmin,
  lunchspaceExists,
  isName,
  locationExists,
  getLunchspaceIdsForUser,
}
