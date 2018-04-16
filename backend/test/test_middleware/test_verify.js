const { verifyAccount } = require('../../routes/middleware/verify')
const { registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { login } = require('../../routes/account/login_account')

const testEmail = 'test-verify@email.com'
const testPassword = 'test-verify-password'

describe('verify account', () => {
  it('TODO: SHOULD VERIFY ACCOUNT', async () => {
    // Register
    const request = { body: { email: testEmail, password: testPassword } }
    const req = mockReq(request)
    const res1 = mockRes()
    await registerAccount(req, res1)
    // Login
    const res2 = mockRes()
    await login(req, res2)
    expect(true)
  })
})
