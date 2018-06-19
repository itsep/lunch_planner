const { localizedStrings } = require('../localized_strings')
const config = require('config')
const { getLanguageCodeOrDefault } = require('../i18n')

const sender = 'noreply.lunchspace@gmail.com'
const host = config.get('host')

function makeLink(token) {
  const link = `${host}/join_lunchspace.html?token=${encodeURIComponent(token)}`
  return link
}

function buildInvitation(receiver, token, language, lastName, firstName, lunchspaceName) {
  const link = makeLink(token)
  console.log(language)
  const languageCode = getLanguageCodeOrDefault(language)
  const mail = {
    from: sender,
    to: receiver,
    subject: localizedStrings.getString('InvitationSubject', languageCode),
    html: `<h1>${localizedStrings.getString('InvitationTitle', languageCode)}</h1>
<p>${firstName} ${lastName}${localizedStrings.getString('InvitationPart1', languageCode)}
"${lunchspaceName}"${localizedStrings.getString('InvitationPart2', languageCode)}</p>
<a href="${link}">${link}</a>`,
  }
  return mail
}

module.exports = {
  buildInvitation,
}
