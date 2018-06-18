const { pool } = require('../../lib/database')
const { validLength } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')
const { lunchspaceChannel } = require('../../lib/lunchspace_channels')
const { getLunchspaceIdsForUser } = require('../../lib/supportive_functions')

const minimumLength = 1
const maximumLength = 100

async function changeName(req, res) {
  let { firstName, lastName } = req.body
  const { imageUrl } = await req.userPromise
  const { userId } = req.token
  const user = {
    firstName,
    lastName,
    imageUrl,
    id: userId,
  }
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
  getLunchspaceIdsForUser(userId).then((lunchspaces) => {
    lunchspaces.forEach((lunchspace) => {
      req.publishClient.publish(lunchspaceChannel(lunchspace.id), { action: 'updateUser', user })
    })
  })
  return res.status(200).json({})
}

module.exports = {
  changeName,
}
