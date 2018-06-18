const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { webSubscription } = require('./web_subscription')
const { iosRegistration } = require('./ios_registration')
const { authenticateRequest } = require('../../middleware/authenticate')
const { checkLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')

const notificationRouter = Router()
notificationRouter.use(bodyParser.json())

notificationRouter.post('/web_subscription', authenticateRequest, checkLunchspacePermissionOfRequest, asyncHandler(webSubscription))
notificationRouter.post('/ios_registration', authenticateRequest, asyncHandler(iosRegistration))

module.exports = {
  router: notificationRouter,
}
