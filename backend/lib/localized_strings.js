const LocalizedStrings = require('localized-strings').default
const { languageKeyToLocalisationMap } = require('../../shared/localizations')

const localizedStrings = new LocalizedStrings(languageKeyToLocalisationMap)

module.exports = {
  localizedStrings,
}
