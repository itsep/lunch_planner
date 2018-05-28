const { pool } = require('../../lib/database')
const { compare } = require('../../lib/password_hash')
const { stringifyToken } = require('../../lib/authenticate')

async function getIdAndHashedPassword(email) {
  const conn = await pool.getConnection()
  const [result] = await conn.execute('SELECT user_id as userId, hashed_password as accountHashedPassword FROM account WHERE email = ?', [email])
  conn.release()
  if (result.length > 0) {
    const idAndPassword =
      { id: result[0].userId, hashedPassword: result[0].accountHashedPassword }
    return idAndPassword
  }
  return undefined
}

async function authenticate(email, password) {
  const user = await getIdAndHashedPassword(email)
  if (!user) {
    return false
  }
  const correctEmailAndPassword = await compare(password, user.hashedPassword)
  if (!correctEmailAndPassword) {
    return false
  }
  const token = stringifyToken(user.id)
  return token
}

async function login(req, res) {
  const { email, password } = req.body
  const token = await authenticate(email, password)
  if (token) {
    res.cookie(
      'lunch_planner_token',
      token,
    )
    res.status(200).json({})
  } else {
    res.status(401).json({ error: `Password does not match with email: ${email}` })
  }
}

module.exports = {
  getIdAndHashedPassword,
  authenticate,
  login,
}
