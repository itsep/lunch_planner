const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')
const { authenticate } = require('./login_account')
const { hash } = require('../../lib/password_hash')

async function updatePassword(userId, password) {
  const hashedPassword = await hash(password)
  await pool.execute('UPDATE account SET hashed_password = ? WHERE user_id = ?', [hashedPassword, userId])
}

async function changePassword(req, res) {
  const { userId } = req.token
  const { email } = await req.userPromise
  const { password, newPassword } = req.body
  if (!await authenticate(email, password)) {
    throw new InputValidationError(
      'password', `Password does not match with email: ${email}`,
      'passwordAndEmailDoesNotMatch', { email }
    )
  }
  await updatePassword(userId, newPassword)
  return res.status(200).json({})
}

module.exports = {
  changePassword,
  updatePassword,
}
