const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { joinEventRoute } = require('./join_event')
const { leaveEventRoute } = require('./leave_event')
const { authenticate } = require('../../middleware/authenticate')
const { checkPermission } = require('../../middleware/permission')

const joinEventRouter = Router()
joinEventRouter.use(bodyParser.json())

joinEventRouter.put('/', authenticate, checkPermission, asyncHandler(joinEventRoute))
joinEventRouter.delete('/', authenticate, checkPermission, asyncHandler(leaveEventRoute))

module.exports = {
  router: joinEventRouter,
}
