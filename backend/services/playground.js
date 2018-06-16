require('dotenv').load()
require('../../shared/lib/promise_polyfill')

const { sendSomeoneElseJoinedMyEventNotification } = require('../lib/send_lunchspace_notification')

sendSomeoneElseJoinedMyEventNotification(
  {
    id: 1,
    name: 'VSF-Experts Mannheim',
  },
  3,
  '2018-06-15',
  '13:00:00',
  {
    id: 3,
    firstName: 'Marc',
    lastName: 'Mehrer',
  }
).catch(error => console.error(error))
