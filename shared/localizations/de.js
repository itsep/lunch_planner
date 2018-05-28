const languageKey = 'de'
const content = {
  test: 'test',
  welcome: 'Hallo {name}',
  welcome2: 'Hallo {lastName} {firstName}',
  // Localizable Errors
  authenticationError: 'Nicht authentifiziert. Bitte melden sie sich an.',
  authorizationError: 'Nicht authorisiert. Sie haben nicht genug Rechte für diese Aktion.',
  unexpectedDatabaseError: 'Unerwarteter Datenbankfehler. Bitte versuchen sie es später erneut.',

  passwordAndEmailDoesNotMatch: 'Passwort und Email {email} stimmen nicht überein.',
}
module.exports = {
  languageKey,
  content,
}
