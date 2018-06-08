const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')
const { stringifyToken } = require('../../lib/authenticate')
const { validLength, validEmail } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')

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
    throw new InputValidationError(
      'firstName', `firstName has invalid length: ${firstName}`,
      'invalidLength', { minimumLength, maximumLength },
    )
  }
  if (!validLength(lastName, maximumLength, minimumLength)) {
    throw new InputValidationError(
      'lastName', `lastName has invalid length: ${lastName}`,
      'invalidLength', { minimumLength, maximumLength },
    )
  }
  firstName = firstName.trim()
  lastName = lastName.trim()
  if (!validEmail(email)) {
    throw new InputValidationError(
      'email', `invalid email: ${email}`,
      'invalidEmail', { email },
    )
  }
  const { userId } = await create(email, password, firstName, lastName)
  const token = stringifyToken(userId)
  res.cookie(
    'lunch_planner_token',
    token,
  )
  return res.status(200).json({})
}

module.exports = {
  create,
  registerAccount,
}
