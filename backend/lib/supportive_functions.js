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
  return result[0].isAdmin
}

async function lunchspaceExists(lunchspaceId) {
  const [result] = await pool.execute('SELECT * FROM lunchspace WHERE lunchspace_id = ?', [lunchspaceId])
  if (result[0]) {
    return true
  }
  return false
}

module.exports = {
  asyncForEach,
  isMember,
  isAdmin,
  lunchspaceExists,
}
