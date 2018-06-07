const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLunchspaceAndJoin } = require('./create_lunchspace')
const { inviteLunchspaceRoute } = require('./invite_lunchspace')
const { joinLunchspace } = require('./join_lunchspace')
const { checkInvitation } = require('./check_invitation')
const { leaveLunchspaceRoute } = require('./leave_lunchspace')
const { authenticateRequest } = require('../../middleware/authenticate')
const { checkLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')
const { getUser } = require('../../middleware/get_user')

const lunchspaceRouter = Router()
lunchspaceRouter.use(bodyParser.json())

lunchspaceRouter.post('/', authenticateRequest, asyncHandler(createLunchspaceAndJoin))
lunchspaceRouter.post('/invite', authenticateRequest, checkLunchspacePermissionOfRequest, getUser, asyncHandler(inviteLunchspaceRoute))
lunchspaceRouter.post('/join', authenticateRequest, asyncHandler(joinLunchspace()))
lunchspaceRouter.get('/check', authenticateRequest, getUser, asyncHandler(checkInvitation()))
lunchspaceRouter.delete('/leave', authenticateRequest, checkLunchspacePermissionOfRequest, asyncHandler(leaveLunchspaceRoute()))

module.exports = {
  router: lunchspaceRouter,
}
