const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { joinEventRoute } = require('./join_event')
const { leaveEventRoute } = require('./leave_event')
const { authenticateRequest } = require('../../middleware/authenticate')
const { checkLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')
const { getUser } = require('../../middleware/get_user')

const joinEventRouter = Router()
joinEventRouter.use(bodyParser.json())

joinEventRouter.put('/', authenticateRequest, checkLunchspacePermissionOfRequest, getUser, asyncHandler(joinEventRoute))
joinEventRouter.delete('/', authenticateRequest, checkLunchspacePermissionOfRequest, getUser, asyncHandler(leaveEventRoute))

module.exports = {
  router: joinEventRouter,
}
