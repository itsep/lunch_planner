const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { createLunchspace } = require('./create_lunchspace')
const { authenticate } = require('../../middleware/authenticate')

const lunchspaceRouter = Router()
lunchspaceRouter.use(bodyParser.json())

lunchspaceRouter.post('/', authenticate, asyncHandler(createLunchspace))

module.exports = {
  router: lunchspaceRouter,
}
