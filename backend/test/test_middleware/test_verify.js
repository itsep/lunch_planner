const { tokenValidation, verifyAccount } = require('../../routes/middleware/verify')
const { registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { login } = require('../../routes/account/login_account')

const testEmail = 'test-verify@email.com'
const testPassword = 'test-verify-password'

describe('verify account', () => {
  let req
  let res1
  let res2
  let testToken
  before(async () => {
    // Register
    const request = { body: { email: testEmail, password: testPassword } }
    req = mockReq(request)
    res1 = mockRes()
    await registerAccount(req, res1)
    // Login
    res2 = mockRes()
    await login(req, res2)
  })
  it('is token set', async () => {
    testToken = res2.cookie.firstCall.lastArg.token
    const validatedToken = tokenValidation(res2.cookie.firstCall.lastArg.token)
    expect(validatedToken).to.have.property('perm')
  })
  it('is token verified', async () => {
    const request = { cookies: { lunch_planner_token: { token: testToken } } }
    req = mockReq(request)
    // Mock cookie in request
    expect(verifyAccount(req, res2, () => true)).to.be.true
  })
})
