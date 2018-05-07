const { parseToken } = require('../../lib/authenticate')
const { authenticate } = require('../../middleware/authenticate')
const { registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes, mockNext } = require('../../lib/express_mock')
const { login } = require('../../routes/account/login_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')

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
    // Mock cookie in request
    const next = mockNext()
    authenticate(req, res2, next)
    expect(next).not.toBeCalledWith(expect.any(Error))
  })
  it('is token invalid', async () => {
    const request = { cookies: { lunch_planner_token: 'invalid token' } }
    req = mockReq(request)
    // Mock cookie in request
    const next = mockNext()
    authenticate(req, res2, next)
    // eslint-disable-next-line no-unused-expressions
    expect(next).toBeCalledWith(expect.any(Error))
  })
})
