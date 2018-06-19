const { availableLanguages, defaultLanguageKey } = require('../../shared/localizations')

function getFirstPartOfLanguageCode(languageCode) {
  return (languageCode || '').substr(0, 2).toLowerCase()
}

function getLanguageCodeOrDefault(languageCode) {
  const normalizedLanguageCode = getFirstPartOfLanguageCode(languageCode)
  if (availableLanguages.indexOf(normalizedLanguageCode) === -1) {
    return defaultLanguageKey
  }
  return normalizedLanguageCode
}

module.exports = {
  getLanguageCodeOrDefault,
}
