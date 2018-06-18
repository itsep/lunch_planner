const { addRegistration } = require('../../lib/notification/ios_registration')

async function iosRegistration(req, res) {
  const { userId, sessionId } = req.token
  addRegistration(userId, sessionId, req.body.token)
  res.json({})
}

module.exports = {
  iosRegistration,
}
