/* eslint no-use-before-define: 0 */
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let badge = 0

let deviceToken = 'not defined'
let message = 'empty'


function readToken() {
  rl.question(`Device Token: (${deviceToken})`, (newToken) => {
    if (newToken) {
      deviceToken = newToken
    }
    readMessage()
  })
}

function readMessage() {
  rl.question(`Message: (${message})`, (newMessage) => {
    if (newMessage) {
      message = newMessage
    }

    badge += 1

    const note = new apn.Notification()

    note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
    note.badge = badge
    note.sound = 'ping.aiff'
    note.alert = message
    note.payload = { messageFrom: 'John Appleseed' }
    note.topic = 'de.nadoba.lunchspace-ios'


    apnProvider.send(note, deviceToken)
      .then(() => {
        console.log(`did send message ${message} to device ${deviceToken}`)
        readToken()
      })
      .catch((error) => {
        console.error(error)
        readToken()
      })
  })
}

readToken()
