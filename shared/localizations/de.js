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
  illegalInput: 'Upps, es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
  illegalLengthLocationName: 'Der Name einer Location muss zwischen 1 and 64 Zeichen lang sein.',
  illegalSubdomain: 'Die angegebene Subdomain ({lunchspaceSubdomain}) enthält ungültige Zeichen.',
  subdomainAlreadyExists: 'Die angegebene Subdomain ({lunchspaceSubdomain}) ist bereits vergeben.',
}
module.exports = {
  languageKey,
  content,
}
