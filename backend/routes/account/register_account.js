const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')
const { stringifyToken } = require('../../lib/authenticate')
const { validLength, validEmail } = require('../../lib/validation')

const minimumLength = 1
const maximumLength = 24

async function create(email, password, firstName, lastName) {
  const hashedPassword = await hash(password)
  return pool.useConnection(async (conn) => {
    const [userCreateResult] = await conn.execute('INSERT INTO user (first_name, last_name)' +
    'VALUES (?,?)', [firstName, lastName])
    const userId = userCreateResult.insertId
    const [accountCreateResult] = await conn.execute('INSERT INTO account (email, hashed_password, user_id) ' +
      'VALUES (?,?,?)', [email, hashedPassword, userId])
    const accountId = accountCreateResult.insertId
    return { userId, accountId }
  })
}

async function registerAccount(req, res) {
  let { firstName, lastName } = req.body
  const { email, password } = req.body
  if (!validLength(firstName, maximumLength, minimumLength)) {
    return res.status(409).json({ message: 'Length of first name must be between 1 and 24 characters.' })
  }
  if (!validLength(lastName, maximumLength, minimumLength)) {
    return res.status(409).json({ message: 'Length of last name must be between 1 and 24 characters.' })
  }
  firstName = firstName.trim()
  lastName = lastName.trim()
  if (!validEmail(email)) {
    return res.status(409).json({ message: 'Invalid email address' })
  }
  try {
    const { userId } = await create(email, password, firstName, lastName)
    const token = stringifyToken(userId)
    res.cookie(
      'lunch_planner_token',
      token,
    )
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(500).json({ message: 'Email is already registered.' })
    } throw error
  }
  return res.status(200).json({})
}

module.exports = {
  create,
  registerAccount,
}
