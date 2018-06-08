// import localizedStrings from '../../../localization'
const config = require('config')

const sender = 'noreply.lunchspace@gmail.com'
const host = config.get('host')

function makeLink(token) {
  const link = `${host}/join_lunchspace.html?token=${encodeURIComponent(token)}`
  return link
}

function buildInvitation(receiver, token, lastName, firstName, lunchspaceName) {
  const link = makeLink(token)
  const mail = {
    from: sender,
    to: receiver,
    subject: 'Invitation to Lunchspace',
    html: `<h1>You have been invited!</h1>
<p>${firstName} ${lastName} has invited you to join "${lunchspaceName}". Click this link to join:</p>
<a href=${link}>${link}</a>`,
  }
  return mail
}

module.exports = {
  buildInvitation,
}
