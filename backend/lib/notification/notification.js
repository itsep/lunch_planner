const { localizedStrings } = require('../localized_strings')

class Notification {
  static localizeValues(values, language) {
    const newValues = {}
    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (typeof value === 'function') {
        newValues[key] = value(language)
      } else {
        newValues[key] = value
      }
    })
    return newValues
  }

  constructor({ title, titleValues, body, bodyValues, link }) {
    this.title = title
    this.titleValues = titleValues || {}
    this.body = body
    this.bodyValues = bodyValues || {}
    this.link = link
  }
  localizedTitle(language) {
    return localizedStrings.formatString(
      localizedStrings.getString(this.title, language),
      Notification.localizeValues(this.titleValues, language)
    )
  }
  localizedBody(language) {
    return localizedStrings.formatString(
      localizedStrings.getString(this.body, language),
      Notification.localizeValues(this.bodyValues, language)
    )
  }
  toWebMessagePayload(language) {
    return JSON.stringify({
      title: this.localizedTitle(language),
      body: this.localizedBody(language),
      link: this.link,
    })
  }
}

module.exports = {
  Notification,
}
