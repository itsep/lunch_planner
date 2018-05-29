const { localisations } = require('./index')

const placeholderRegex = /(\{[\d|\w]+\})/g

describe('localisations', () => {
  it('all keys should be contained in all languagues', () => {
    // all defined keys
    const keys = {}
    // gather all defined keys in every language
    localisations.forEach((localisation) => {
      Object.keys(localisation.content).forEach((key) => {
        keys[key] = keys[key] || []
        keys[key].push(localisation.languageKey)
      })
    })

    const keysList = Object.keys(keys)
    // check if every language has defined every key
    localisations.forEach((localisation) => {
      const { content, languageKey } = localisation
      keysList.forEach((key) => {
        if (!content[key]) {
          console.error(`Translation key '${key}' is not defined in language ${languageKey} but defined in ${keys[key]}`)
        }
        expect(content).toHaveProperty(key)
      })
    })
  })
  it('all placeholder should be contained in all languagues', () => {
    // all defined keys with all placeholders
    const keysToPlaceholderMap = {}
    // gather all defined keys in every language
    localisations.forEach((localisation) => {
      Object.keys(localisation.content).forEach((key) => {
        keysToPlaceholderMap[key] = keysToPlaceholderMap[key] || {}
        const placeholderToLanguages = keysToPlaceholderMap[key]
        const translation = localisation.content[key]
        const placeholders = translation.match(placeholderRegex) || []
        placeholders.forEach((placeholder) => {
          placeholderToLanguages[placeholder] = placeholderToLanguages[placeholder] || []
          placeholderToLanguages[placeholder].push(localisation.languageKey)
        })
      })
    })

    const keysList = Object.keys(keysToPlaceholderMap)
    // check if every language has all defined placeholders
    localisations.forEach((localisation) => {
      const { content, languageKey } = localisation
      keysList.forEach((key) => {
        const requiredPlaceholderMap = keysToPlaceholderMap[key]
        const requiredPlaceholders = Object.keys(requiredPlaceholderMap)
        if (requiredPlaceholders.length === 0) {
          return
        }
        const translation = content[key]
        const placeholders = translation.match(placeholderRegex) || []

        if (requiredPlaceholders.length !== placeholders.length) {
          const contentOfAllLanguages = localisations
            .map(l => `Content(${l.languageKey}): ${l.content[key]}`)
            .join('\n')
          console.error(`localisation for key '${key}' in language '${languageKey}' has missing placeholders:
Placeholders: ${placeholders}
Required Placeholders: ${requiredPlaceholders}
${contentOfAllLanguages}`)
        }
        expect(placeholders).toEqual(expect.arrayContaining(requiredPlaceholders))
      })
    })
  })
})
