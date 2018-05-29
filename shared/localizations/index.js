const de = require('./de')
const en = require('./en')

const localisations = [de, en]
const languageKeyToLocalisationMap = {}
localisations.forEach((localisation) => {
  languageKeyToLocalisationMap[localisation.key] = localisation.content
})

module.exports = {
  localisations,
  languageKeyToLocalisationMap,
}

