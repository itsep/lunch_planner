const { InputValidationError } = require('../../../shared/lib/error')
const { removeSubscription, addSubscription } = require('../../lib/notification/web_subscription')

async function webSubscription(req, res) {
  const userAgent = req.get('user-agent')
  const { oldSubscription, newSubscription } = req.body
  if (!oldSubscription && !newSubscription) {
    throw new InputValidationError(
      'oldSubscription, newSubscription',
      'oldSubscription and newSubscription are not defined.'
    )
  }
  const { userId } = req.token
  if (oldSubscription) {
    await removeSubscription(userId, oldSubscription)
  }
  if (newSubscription) {
    await addSubscription(userId, newSubscription, userAgent)
  }
  res.json({})
}

module.exports = {
  webSubscription,
}
