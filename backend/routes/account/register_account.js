const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')

async function create(email, password) {
  const hashedPassword = await hash(password)
  const conn = await pool.getConnection()
  try {
    await conn.execute('INSERT INTO account (account_email, account_hashed_password) ' +
      'VALUES (?,?)', [email, hashedPassword])
    return false
  } catch (error) {
    return error
  } finally {
    conn.release()
  }
}

async function registerAccount(req, res) {
  const { email, password } = req.body
  const error = await create(email, password)
  if (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(500).json({ error: 'Email is already registered.' })
    } else throw error
  } else {
    res.status(200).end()
  }
}

module.exports = {
  create,
  registerAccount,
}
