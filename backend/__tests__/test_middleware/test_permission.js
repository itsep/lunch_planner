const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')
const { registerAccount } = require('../../routes/account/register_account')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { mockReq, mockRes, mockNext } = require('../../lib/express_mock')
const { checkPermission } = require('../../middleware/permission')

const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'passwort'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testLunchspaceName = 'Testbude'
const testSubdomain = 'buden-tester'
const testUserId = 1

describe('permission', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const setUpRequest = {
      body: {
        email: testEmail,
        password: testPassword,
        firstName: testFirstName,
        lastName: testLastName,
        lunchspaceName: testLunchspaceName,
        lunchspaceSubdomain: testSubdomain,
      },
      token: { userId: testUserId },
    }
    const req = mockReq(setUpRequest)
    const res = mockRes()
    registerAccount(req, res)
    createLunchspace(req, res)
  })
  const request = {
    body: { subdomain: testSubdomain },
    token: { userId: testUserId },
  }
  it('has permission', () => {
    const req = mockReq(request)
    const res = mockRes()
    const next = mockNext()
    checkPermission(req, res, next)
    expect(next).not.toBeCalledWith(expect.any(Error))
  })
})
