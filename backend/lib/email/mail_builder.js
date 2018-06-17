const { localizedStrings } = require('../localized_strings')
const config = require('config')
const { pool } = require('../database')

const sender = 'noreply.lunchspace@gmail.com'
const host = config.get('host')

function makeLink(token) {
  const link = `${host}/join_lunchspace.html?token=${encodeURIComponent(token)}`
  return link
}

function buildInvitation(receiver, token, language, lastName, firstName, lunchspaceName) {
  const link = makeLink(token)
  const mail = {
    from: sender,
    to: receiver,
    subject: localizedStrings.getString('InvitationSubject', language),
    html: `<h1>${localizedStrings.getString('InvitationTitle', language)}</h1>
<p>${firstName} ${lastName}${localizedStrings.getString('InvitationPart1', language)}
"${lunchspaceName}"${localizedStrings.getString('InvitationPart2', language)}</p>
<a href="${link}">${link}</a>`,
  }
  return mail
}

module.exports = {
  buildInvitation,
}
