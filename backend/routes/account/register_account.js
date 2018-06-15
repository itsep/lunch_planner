const { pool } = require('../../lib/database')
const { hash } = require('../../lib/password_hash')
const { stringifyToken, setTokenOnResponse } = require('../../lib/authenticate')
const { validLength, validEmail } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')

const minimumLength = 1
const maximumLength = 24

async function create(email, password, firstName, lastName, language) {
  const hashedPassword = await hash(password)
  return pool.useConnection(async (conn) => {
    try {
      const [userCreateResult] = await conn.execute('INSERT INTO user (first_name, last_name, language)' +
        'VALUES (?,?,?)', [firstName, lastName, language])
      const userId = userCreateResult.insertId
      const [accountCreateResult] = await conn.execute('INSERT INTO account (email, hashed_password, user_id) ' +
        'VALUES (?,?,?)', [email, hashedPassword, userId])
      const accountId = accountCreateResult.insertId
      return { userId, accountId }
    } catch (error) {
      // user with same email adress is already registered
      if (error.code === 'ER_DUP_ENTRY') {
        throw new InputValidationError(
          'email', `email already registered: ${email}`,
          'emailAlreadyRegistered', { email },
        )
      } else {
        throw error
      }
    }
  })
}

const languageMinLength = 2
const languageMaxLength = 8

async function registerAccount(req, res) {
  let { firstName, lastName } = req.body
  const { email, password, language } = req.body
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
  if (!validLength(language, languageMaxLength, languageMinLength)) {
    throw new InputValidationError(
      'language', `language has invalid length: ${language}`,
      'invalidLength', { minimumLength: languageMinLength, maximumLength: languageMaxLength },
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
  const { userId } = await create(email, password, firstName, lastName, language)
  const token = stringifyToken(userId)
  setTokenOnResponse(res, token)
  return res.status(200).json({})
}

module.exports = {
  create,
  registerAccount,
}
