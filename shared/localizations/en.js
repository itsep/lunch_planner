const languageKey = 'en'
const content = {
  productName: 'Lunchspace',
  // Localizable Errors
  authenticationError: 'Not authenticated. Please login.',
  authorizationError: 'Not authorized. You do not have the rights to perform this action.',
  unexpectedDatabaseError: 'Unexpected Database error. Please try again later.',
  unknownError: 'Unknown error. Please try again later.',
  unknownErrorWithMessage: 'Unexpected error: {message}',

  passwordAndEmailDoesNotMatch: 'Password does not match with email {email}.',
  illegalInput: 'Upps, something went wrong. Please try again.',
  illegalLengthLocationName: 'The name of a location must be between 1 and 64 characters long.',
  illegalSubdomain: 'The given subdomain ({lunchspaceSubdomain}) contains illegal characters.',
  subdomainAlreadyExists: 'The given Subdomain ({lunchspaceSubdomain}) is already in use.',
  fieldRequired: 'This field is required.',
  invalidEmail: 'Please enter a valid email address.',
  illegalHyphen: 'A subdomain may not contain a leading or trailing hyphen(-).',
  inputTooLong24: 'max 24 characters',

  joinLunchspace: 'You got invited to {lunchspaceName}!',
  notYou: 'Not you?',
  accept: 'Accept',

  createLunchspace: 'Create Lunchspace',
  createLocation: 'Create Location',
  login: 'Login',
  logout: 'Logout',
  today: 'Today',
  signUp: 'Sign Up',
}
module.exports = {
  languageKey,
  content,
}
