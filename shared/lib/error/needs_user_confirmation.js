const { LocalizableError } = require('./localizable_error')

class NeedsUserConfirmation extends LocalizableError {
  constructor(message) {
    super(message)
    this.name = NeedsUserConfirmation.name
    this.status = 401
    this.code = 'NEEDS_USER_CONFIRMATION'
    this.localizationKey = 'needsUserConfirmation'
  }
}

NeedsUserConfirmation.name = 'needsUserConfirmation'

module.exports = { NeedsUserConfirmation }
