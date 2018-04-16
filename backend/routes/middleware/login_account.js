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

async function login(email, password) {
  const account = await getIdAndHashedPassword(email)
  if (account && compare(password, account.hashedPassword)) {
    return jwt.sign(
      {
        auth: account.id,
      },
      secret,
      { expiresIn: '72h' }
    )
  }
  return false
}

async function accountAuthenticate(req, res) {
  const { email, password } = req.body
  const token = await login(email, password)
  if (token) {
    res.cookies.set('test')
  } else {
    res.status(401).json({ error: `Password does not match with email: ${email}` })
  }
}

module.exports = {
  getIdAndHashedPassword,
  login,
  accountAuthenticate,
}
