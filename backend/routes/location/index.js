const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLocation } = require('./create_location')
const { getLocations } = require('./get_locations')
const { authenticateRequest } = require('../../middleware/authenticate')
const { checkLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')
const { getUser } = require('../../middleware/get_user')
const { getLunchspaces } = require('../../middleware/get_lunchspaces')
const { deleteLocation } = require('./delete_location')

const locationRouter = Router()
locationRouter.use(bodyParser.json())

locationRouter.post('/', authenticateRequest, checkLunchspacePermissionOfRequest, asyncHandler(createLocation))
locationRouter.get('/', authenticateRequest, getUser, getLunchspaces, checkLunchspacePermissionOfRequest, asyncHandler(getLocations))
locationRouter.delete('/',authenticateRequest,checkLunchspacePermissionOfRequest, asyncHandler(deleteLocation))

module.exports = {
  router: locationRouter,
}
