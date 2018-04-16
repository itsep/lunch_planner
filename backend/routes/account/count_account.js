const { pool } = require('../../lib/database')

async function accountCount(req, res) {
  const conn = await pool.getConnection()
  const query = conn.execute('SELECT COUNT(*) as count FROM account')
  conn.release()
  const [result] = await query
  const { count } = result[0]
  res.json({
    count,
  })
}

module.exports = {
  accountCount,
}
