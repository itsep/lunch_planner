const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

async function create(email, password, firstName, lastName) {
  const hashedPassword = await hash(password)
  return pool.useConnection(async (conn) => {
    const result = await conn.execute('INSERT INTO user (first_name, last_name)' +
    'VALUES (?,?)', [firstName, lastName])
    const userId = result[0].insertId
    await conn.execute('INSERT INTO account (email, hashed_password, user_id) ' +
      'VALUES (?,?,?)', [email, hashedPassword, userId])
    return userId
  })
}

async function registerAccount(req, res) {
  const {
    email, password, firstName, lastName,
  } = req.body
  try {
    const userId = await create(email, password, firstName, lastName)
    const token = jwt.sign(
      {
        auth: userId,
        perm: {
          admin: true,
        },
      },
      secret,
      { expiresIn: '72h' }
    )
    res.cookie(
      'lunch_planner_token',
      token,
    )
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(500).json({ error: 'Email is already registered.' })
    } throw error
  }
  return res.status(200).end()
}

module.exports = {
  create,
  registerAccount,
}
