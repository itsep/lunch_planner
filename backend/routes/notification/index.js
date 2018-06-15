const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { webSubscription } = require('./web_subscription')
const { authenticateRequest } = require('../../middleware/authenticate')
const { checkLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')

const notificationRouter = Router()
notificationRouter.use(bodyParser.json())

notificationRouter.post('/web_subscription', authenticateRequest, checkLunchspacePermissionOfRequest, asyncHandler(webSubscription))

module.exports = {
  router: notificationRouter,
}
