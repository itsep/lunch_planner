const en = require('./en')
const de = require('./de')

const defaultLanguageKey = en.languageKey
const localisations = [en, de]
const availableLanguages = localisations.map(l => l.languageKey)
const languageKeyToLocalisationMap = {}
localisations.forEach((localisation) => {
  languageKeyToLocalisationMap[localisation.languageKey] = localisation.content
})

module.exports = {
  localisations,
  languageKeyToLocalisationMap,
  availableLanguages,
  defaultLanguageKey,
}

