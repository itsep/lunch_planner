const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLocation } = require('./create_location')
const { getLocations } = require('./get_locations')
const { authenticate } = require('../../middleware/authenticate')
const { checkPermission } = require('../../middleware/permission')
const { getUser } = require('../../middleware/get_user')

const locationRouter = Router()
locationRouter.use(bodyParser.json())

locationRouter.post('/', authenticate, checkPermission, asyncHandler(createLocation))
locationRouter.get('/', authenticate, getUser, checkPermission, asyncHandler(getLocations))

module.exports = {
  router: locationRouter,
}
