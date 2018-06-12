import moment from 'moment'
import 'moment/locale/de'
import localizedStrings from './localization'

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L',
  },
})
moment.updateLocale('de', {
  calendar: {
    lastDay: '[gestern]',
    sameDay: '[heute]',
    nextDay: '[morgen]',
    lastWeek: '[letzten] dddd',
    nextWeek: 'dddd',
    sameElse: 'L',
  },
})

moment.locale(localizedStrings.getLanguage())

export default moment
