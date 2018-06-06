const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLunchspaceAndJoin } = require('./create_lunchspace')
const { getLocations } = require('./get_lunchspaces')
const { authenticateRequest } = require('../../middleware/authenticate')
const { getUser } = require('../../middleware/get_user')

const lunchspaceRouter = Router()
lunchspaceRouter.use(bodyParser.json())

lunchspaceRouter.post('/', authenticateRequest, asyncHandler(createLunchspaceAndJoin))
lunchspaceRouter.get('/', authenticateRequest, getUser, asyncHandler(getLocations))

module.exports = {
  router: lunchspaceRouter,
}
