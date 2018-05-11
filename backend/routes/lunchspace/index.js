const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLunchspaceAndJoin } = require('./create_lunchspace')
const { authenticate } = require('../../middleware/authenticate')

const lunchspaceRouter = Router()
lunchspaceRouter.use(bodyParser.json())

lunchspaceRouter.post('/', authenticate, asyncHandler(createLunchspaceAndJoin))

module.exports = {
  router: lunchspaceRouter,
}
