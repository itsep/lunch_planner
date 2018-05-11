const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createJoinEvent } = require('./create_join_event')
const { authenticate } = require('../../middleware/authenticate')
const { checkPermission } = require('../../middleware/permission')

const joinEventRouter = Router()
joinEventRouter.use(bodyParser.json())

joinEventRouter.post('/', authenticate, checkPermission, asyncHandler(createJoinEvent))

module.exports = {
  router: joinEventRouter,
}
