const { pool } = require('../../lib/database')
const { validEmail } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')
const uuidv4 = require('uuid/v4')
const { sendEMail } = require('../../lib/email/mailer')
const { buildInvitation } = require('../../lib/email/mail_builder')
const { asyncForEach } = require('../../lib/supportive_functions')

async function getToken(email, lunchspaceId) {
  const [result] = await pool.execute(
    'SELECT token FROM invitation WHERE email = ? AND lunchspace_id = ?',
    [email, lunchspaceId]
  )
  if (result[0]) {
    return result[0].token
  }
  const token = uuidv4()
  await pool.execute(
    'INSERT INTO invitation (token, lunchspace_id, email) VALUES (?, ?, ?)',
    [token, lunchspaceId, email]
  )
  return token
}

async function inviteLunchspaceRoute(req, res) {
  const { firstName, lastName } = await req.userPromise
  const { id: lunchspaceId, name: lunchspaceName } = req.lunchspace
  const { receivers } = req.body
  await asyncForEach(receivers, async (receiverMail) => {
    if (!validEmail(receiverMail)) {
      throw new InputValidationError(
        'email', `invalid email: ${receiverMail}`,
        'invalidEmail', { receiverMail },
      )
    }
    const token = await getToken(receiverMail, lunchspaceId)
    const mail = buildInvitation(receiverMail, token, lastName, firstName, lunchspaceName)
    sendEMail(mail)
  })
  return res.status(200).json({})
}

module.exports = {
  getToken,
  inviteLunchspaceRoute,
}
