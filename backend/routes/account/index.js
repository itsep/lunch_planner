const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { accountCount } = require('./count_account')
const { registerAccount } = require('./register_account')
const { login } = require('./login_account')
const { logout } = require('./logout_account')
const { verifyAccount } = require('../middleware/verify')

const accountRouter = Router()
accountRouter.use(bodyParser.json())

accountRouter.get('/count', verifyAccount, asyncHandler(accountCount))

accountRouter.post('/', asyncHandler(registerAccount))

accountRouter.post('/login', asyncHandler(login))

accountRouter.post('/logout', asyncHandler(logout))

module.exports = {
  router: accountRouter,
}
