const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const { registerAccount } = require('./register_account')
const { login } = require('./login_account')
const { logout } = require('./logout_account')
const { changeName } = require('./change_name')
// const { changePassword } = require('./change_password')
const { getUser } = require('../../middleware/get_user')
const { authenticateRequest } = require('../../middleware/authenticate')

const accountRouter = Router()
accountRouter.use(bodyParser.json())

accountRouter.post('/', asyncHandler(registerAccount))

accountRouter.post('/login', asyncHandler(login))

accountRouter.post('/logout', asyncHandler(logout))

accountRouter.put('/change_name', authenticateRequest, getUser, asyncHandler(changeName))

// accountRouter.put('/change_password', authenticateRequest, asyncHandler(changePassword))

module.exports = {
  router: accountRouter,
}
