const en = require('./en')
const de = require('./de')

const localisations = [en, de]
const languageKeyToLocalisationMap = {}
localisations.forEach((localisation) => {
  languageKeyToLocalisationMap[localisation.languageKey] = localisation.content
})

module.exports = {
  localisations,
  languageKeyToLocalisationMap,
}

