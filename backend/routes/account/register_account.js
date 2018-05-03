const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')

async function create(email, password) {
  const hashedPassword = await hash(password)
  await pool.execute('INSERT INTO account (email, hashed_password) ' +
      'VALUES (?,?)', [email, hashedPassword])
  return true
}

async function registerAccount(req, res) {
  const { email, password } = req.body
  try {
    await create(email, password)
    res.status(200).end()
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(500).json({ error: 'Email is already registered.' })
    } else throw error
  }
}

module.exports = {
  create,
  registerAccount,
}
