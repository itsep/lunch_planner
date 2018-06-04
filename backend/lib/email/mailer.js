const nodemailer = require('nodemailer')

const sender = 'noreply.lunchspace@gmail.com'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: 'dffms2706',
  },
})

function sendEMail(mail) {
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
}
