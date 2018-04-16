const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { accountCount } = require('./middleware/count_account')
const { registerAccount } = require('./middleware/register_account')
const { accountAuthenticate } = require('./middleware/login_account')
const { verifyAccount } = require('./middleware/verify_account')

const accountRouter = Router()
accountRouter.use(bodyParser.json())

accountRouter.get('/count', [verifyAccount], asyncHandler(accountCount))

accountRouter.post('/', asyncHandler(registerAccount))

accountRouter.post('/login', asyncHandler(accountAuthenticate))

module.exports = {
  router: accountRouter,
}
