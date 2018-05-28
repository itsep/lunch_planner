const languageKey = 'en'
const content = {
  test: 'test',
  welcome: 'Hello {name}',
  welcome2: 'Hello {firstName} {lastName}',
  // Localizable Errors
  authenticationError: 'Not authenticated. Please login.',
  authorizationError: 'Not authorized. You do not have enough rights to for this action.',
  unexpectedDatabaseError: 'Unexpected Database error.',

  passwordAndEmailDoesNotMatch: 'Password does not match with email {email}.',
}
module.exports = {
  languageKey,
  content,
}
