const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createJoinEvent } = require('./create_join_event')

const joinEventRouter = Router()
joinEventRouter.use(bodyParser.json())

joinEventRouter.post('/', asyncHandler(createJoinEvent))

module.exports = {
  router: joinEventRouter,
}
