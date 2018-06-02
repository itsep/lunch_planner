const { parseToken } = require('../../lib/authenticate')
const { asyncAuthenticateRequest } = require('../../middleware/authenticate')
const { registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { login } = require('../../routes/account/login_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')

const testEmail = 'test-verify@email.com'
const testPassword = 'test-verify-password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'

describe('verify account', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  let testToken
  beforeAll(async () => {
    // Register
    const request = {
      body: {
        email: testEmail, password: testPassword, firstName: testFirstName, lastName: testLastName,
      },
    }
    const req = mockReq(request)
    const res1 = mockRes()
    await registerAccount(req, res1)
  })
  it('is token set', async () => {
    const request = {
      body: {
        email: testEmail, password: testPassword, firstName: testFirstName, lastName: testLastName,
      },
    }
    const req = mockReq(request)
    const res = mockRes()
    await login(req, res)
    const [firstCall] = res.cookie.mock.calls
    // eslint-disable-next-line prefer-destructuring
    testToken = firstCall[1]

    const validatedToken = parseToken(testToken)
    expect(validatedToken.userId).toBeDefined()
  })
  it('is token verified', async () => {
    const request = { cookies: { lunch_planner_token: testToken } }
    const req = mockReq(request)
    await expect(asyncAuthenticateRequest(req, mockReq())).resolves.not.toThrow()
  })
  it('is token invalid', async () => {
    const request = { cookies: { lunch_planner_token: 'invalid token' } }
    const req = mockReq(request)
    await expect(asyncAuthenticateRequest(req, mockReq())).rejects.toThrowError(Error)
  })
})
