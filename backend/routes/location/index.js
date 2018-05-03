const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLocation } = require('./create_location')

const locationRouter = Router()
locationRouter.use(bodyParser.json())

locationRouter.post('/', asyncHandler(createLocation()))

module.exports = {
  router: locationRouter,
}
