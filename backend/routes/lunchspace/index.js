const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLunchspaceAndJoin } = require('./create_lunchspace')
const { authenticateRequest } = require('../../middleware/authenticate')

const lunchspaceRouter = Router()
lunchspaceRouter.use(bodyParser.json())

lunchspaceRouter.post('/', authenticateRequest, asyncHandler(createLunchspaceAndJoin))

module.exports = {
  router: lunchspaceRouter,
}
