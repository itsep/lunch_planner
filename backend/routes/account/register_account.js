const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')
const { createToken } = require('../../lib/authenticate')
const { validLength, validEmail } = require('../../lib/validation')

const minimumLength = 1
const maximumLength = 24

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
  let { firstName, lastName } = req.body
  const { email, password } = req.body
  if (!validLength(firstName, maximumLength, minimumLength)) {
    return res.status(409).json({ error: 'Length of first name must be between 1 and 24 characters.' })
  }
  if (!validLength(lastName, maximumLength, minimumLength)) {
    return res.status(409).json({ error: 'Length of last name must be between 1 and 24 characters.' })
  }
  firstName = firstName.trim()
  lastName = lastName.trim()
  if (!validEmail(email)) {
    return res.status(409).json({ error: 'Invalid email address' })
  }
  try {
    const userId = await create(email, password, firstName, lastName)
    const token = createToken(userId)
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
