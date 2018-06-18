const { localizedStrings } = require('../localized_strings')
const apn = require('apn')

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

  constructor({
    title, titleValues, body, bodyValues, link,
  }) {
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
  toIOSNotification(language) {
    const note = new apn.Notification()

    note.expiry = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expires 24 hour from now.
    note.sound = 'ping.aiff'
    note.alert = {
      title: this.localizedTitle(language),
      body: this.localizedBody(language),
    }
    note.payload = { link: this.link }
    note.topic = 'de.nadoba.lunchspace-ios'

    return note
  }
}

module.exports = {
  Notification,
}
