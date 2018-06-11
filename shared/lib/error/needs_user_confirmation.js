const { LocalizableError } = require('./localizable_error')

class NeedsUserConfirmation extends LocalizableError {
  constructor(message) {
    super(message)
    this.identifier = NeedsUserConfirmation.identifier
    this.status = 401
    this.code = 'NEEDS_USER_CONFIRMATION'
    this.localizationKey = 'needsUserConfirmation'
  }
}

NeedsUserConfirmation.identifier = 'NeedsUserConfirmation'

module.exports = { NeedsUserConfirmation }
