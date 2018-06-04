const { pool } = require('../../lib/database')
const { validEmail } = require('../../lib/validation')
const { InputValidationError } = require('../../../shared/lib/error')
const uuidv4 = require('uuid/v4')
const { sendEMailBeta } = require('../../lib/email/mailer')

async function getLunchspaceName(lunchspaceId) {
  const [result] = await pool.execute('SELECT name AS lunchspaceName FROM lunchspace WHERE id = ?', [lunchspaceId])
  return result.lunchspaceName
}

async function getToken(email, lunchspaceId) {
  const [result] = await pool.execute(
    'SELECT token FROM invitation WHERE email = ? AND lunchspace_id = ?',
    [email, lunchspaceId]
  )
  if (result.token) {
    return result.token
  }
  const token = uuidv4()
  await pool.execute(
    'INSERT INTO invitation (token, lunchspace_id, email) VALUES (?, ?, ?)',
    [token, lunchspaceId, email]
  )
  return token
}

async function inviteLucnhspaceRoute(req, res) {
  const { firstName, lastName } = await req.userPromise
  const { id: lunchspaceId } = req.lunchspace
  const { receivers } = req.body
  const lunchspaceName = getLunchspaceName(lunchspaceId)
  receivers.forEach((receiverMail) => {
    if (!validEmail(receiverMail)) {
      throw new InputValidationError(
        'email', `invalid email: ${receiverMail}`,
        'invalidEmail', { receiverMail },
      )
    }
    const token = getToken(receiverMail, lunchspaceId)
    const link = `localhost:8080/lunchspace/me?token=${encodeURIComponent(token)}`
    const mailContent = {
      from: 'noreplay.lunchspace@gmail.com',
      to: receiverMail,
      subject: 'Invitation to Lunchspace',
      html: `<h1>You have been invites!</h1><p>${firstName} ${lastName} has invited you to "${lunchspaceName}. Click this link to join:</p><a>href=${link}</a>`,
    }
    sendEMailBeta(mailContent)
  })
}
inviteLucnhspaceRoute()
