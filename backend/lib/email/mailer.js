const nodemailer = require('nodemailer')

const sender = process.env.SENDER_EMAIL
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: sender,
    pass: process.env.EMAIL_PASSWORD,
  },
})


function sendEMail(mail) {
  if (!process.env.SENDER_EMAIL || !process.env.EMAIL_SERVICE || !process.env.EMAIL_PASSWORD) {
    console.error('No sender data for email given')
    process.exit(1)
  }
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      throw error
    }
    return (`Email sent: ${info.response}`)
  })
}

module.exports = {
  sendEMail,
}
