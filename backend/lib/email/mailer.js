const nodemailer = require('nodemailer')

const { buildEmail } = 'TODO'

const sender = 'noreply.lunchspace@gmail.com'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: 'dffms2706',
  },
})

function sendEMail(receivers, topic) {
  receivers.forEach((receiver) => {
    const mailOptions = buildEmail(sender, receiver, topic)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })
  })
}

function sendEMailBeta(mail){
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Email sent: ${info.response}`)
    }
  })
}

module.exports = {
  sendEMail,
  sendEMailBeta,
}
