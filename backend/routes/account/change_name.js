const { pool } = require('../../lib/database')
const { validLength } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')

const minimumLength = 1
const maximumLength = 100

async function changeName(req, res) {
  let { firstName, lastName } = req.body
  const { userId } = req.token
  if (!validLength(firstName, maximumLength, minimumLength)) {
    throw new InputValidationError(
      'firstName', `firstName has invalid length: ${lastName}`,
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
  await pool.execute('UPDATE user SET first_name = ?, last_name = ? WHERE id = ?', [firstName, lastName, userId])
  return res.status(200).json({})
}

module.exports = {
  changeName,
}
