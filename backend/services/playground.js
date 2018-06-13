require('dotenv').load()
require('../../shared/lib/promise_polyfill')

const { sendNotificationToUsers } = require('../lib/notification/send_notification')
const { Notification } = require('../lib/notification/notification')

sendNotificationToUsers([1], new Notification({
  title: 'Marc joined Sonnendeck at 11:00am',
  body: 'Lunchspace HS-Mannheim',
  link: 'https://hs-mannheim.mylunch.space/homepage.html',
})).catch(error => console.error(error))
