const { localizedStrings } = require('../localized_strings')
const { getLanguageCodeOrDefault } = require('../i18n')
const { getInviteToLunchspaceLink } = require('../lunchspace')

const sender = 'noreply.lunchspace@gmail.com'

function buildInvitation(receiver, token, language, lastName, firstName, lunchspaceName) {
  const link = getInviteToLunchspaceLink(token)
  const languageCode = getLanguageCodeOrDefault(language)
  return {
    from: sender,
    to: receiver,
    subject: localizedStrings.getString('InvitationSubject', languageCode),
    html: `<h1>${localizedStrings.getString('InvitationTitle', languageCode)}</h1>
<p>${firstName} ${lastName}${localizedStrings.getString('InvitationPart1', languageCode)}
"${lunchspaceName}"${localizedStrings.getString('InvitationPart2', languageCode)}</p>
<a href="${link}">${link}</a>`,
  }
}

module.exports = {
  buildInvitation,
}
