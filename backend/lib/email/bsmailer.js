const nodemailer = require('nodemailer')

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
    const mailOptions = {
      from: sender,
      to: receiver,
      subject: topic.subject,
      html: topic.content,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })
  })
}

module.exports = {
  sendEMail,
}
