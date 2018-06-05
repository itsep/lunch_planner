const { pool } = require('../../lib/database')

async function leaveLunchspace(userId, lunchspaceId) {
  await pool.execute('DELETE FROM member_of WHERE user_id = ? AND lunchspace_id = ?', [userId, lunchspaceId])
}

async function leaveLunchspaceRoute(req, res) {
  const { userId } = req.token
  const { id } = req.lunchspace
  await leaveLunchspace(userId, id)
  return res.status(200).json({})
}

module.exports = {
  leaveLunchspace,
  leaveLunchspaceRoute,
}
