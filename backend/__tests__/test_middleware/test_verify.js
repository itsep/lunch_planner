const { parseToken } = require('../../lib/authenticate')
const { asyncAuthenticateRequest } = require('../../middleware/authenticate')
const { registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes, mockNext } = require('../../lib/express_mock')
const { login } = require('../../routes/account/login_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')

const testEmail = 'test-verify@email.com'
const testPassword = 'test-verify-password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'

describe('verify account', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  let req
  let res1
  let res2
  let testToken
  beforeAll(async () => {
    // Register
    const request = {
      body: {
        email: testEmail, password: testPassword, firstName: testFirstName, lastName: testLastName,
      },
    }
    req = mockReq(request)
    res1 = mockRes()
    await registerAccount(req, res1)
    // Login
    res2 = mockRes()
    await login(req, res2)
  })
  it('is token set', async () => {
    const [firstCall] = res2.cookie.mock.calls
    // eslint-disable-next-line prefer-destructuring
    testToken = firstCall[1]

    const validatedToken = parseToken(testToken)
    expect(validatedToken.userId).toBeDefined()
  })
  it('is token verified', async () => {
    const request = { cookies: { lunch_planner_token: testToken } }
    req = mockReq(request)
    await expect(asyncAuthenticateRequest(req, res2)).resolves.not.toThrow()
  })
  it('is token invalid', async () => {
    const request = { cookies: { lunch_planner_token: 'invalid token' } }
    req = mockReq(request)
    await expect(asyncAuthenticateRequest(req, res2)).rejects.toThrowError(Error)
  })
})
