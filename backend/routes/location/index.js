const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLocation } = require('./create_location')
const { authenticate } = require('../../middleware/authenticate')

const locationRouter = Router()
locationRouter.use(bodyParser.json())

locationRouter.post('/', authenticate, asyncHandler(createLocation()))

module.exports = {
  router: locationRouter,
}
