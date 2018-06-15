const { pool } = require('../../lib/database')

async function getLunchspacesForUser(userId) {
  const [lunchspaces] = await pool.execute(`SELECT name, subdomain, is_admin as isAdmin FROM lunchspace
LEFT JOIN member_of ON lunchspace_id = lunchspace.id 
WHERE user_id = ?`, [userId])
  lunchspaces.forEach((lunchspace) => {
    // convert to boolean
    // eslint-disable-next-line no-param-reassign
    lunchspace.isAdmin = !!lunchspace.isAdmin
  })
  return lunchspaces
}

async function getLunchspaces(req, res) {
  const { userId } = req.token
  const lunchspaces = await getLunchspacesForUser(userId)
  const result = {
    lunchspaces,
    user: await req.userPromise,
  }
  return res.json(result)
}

module.exports = {
  getLunchspaces,
}
