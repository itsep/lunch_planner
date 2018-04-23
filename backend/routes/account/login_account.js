const { pool } = require('../../lib/database')
const { compare } = require('../../lib/password_hash')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

async function getIdAndHashedPassword(email) {
  const conn = await pool.getConnection()
  const [result] = await conn.execute('SELECT account_id as accountId, account_hashed_password as accountHashedPassword FROM account WHERE account_email = ?', [email])
  conn.release()
  if (result.length > 0) {
    const idAndPassword =
      { id: result[0].accountId, hashedPassword: result[0].accountHashedPassword }
    return idAndPassword
  }
  return undefined
}

async function authenticate(email, password) {
  const account = await getIdAndHashedPassword(email)
  if (!account) {
    return false
  }
  const correctEmailAndPassword = await compare(password, account.hashedPassword)
  if (!correctEmailAndPassword) {
    return false
  }
  const token = jwt.sign(
    {
      auth: account.id,
      perm: {
        admin: true,
      },
    },
    secret,
    { expiresIn: '72h' }
  )
  return token
}

async function login(req, res) {
  const { email, password } = req.body
  const token = await authenticate(email, password)
  if (token) {
    res.cookie(
      'lunch_planner_token',
      { token }
    )
    res.status(200).end()
  } else {
    res.status(401).json({ error: `Password does not match with email: ${email}` })
  }
}

module.exports = {
  getIdAndHashedPassword,
  authenticate,
  login,
}
