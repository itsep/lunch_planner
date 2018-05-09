const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
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
const testUserId2 = 2

describe('permission', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const req = mockReq({
      body: {
        email: testEmail,
        password: testPassword,
        firstName: testFirstName,
        lastName: testLastName,
        lunchspaceName: testLunchspaceName,
        lunchspaceSubdomain: testSubdomain,
      },
      token: { userId: testUserId },
    })
    const res = mockRes()
    await registerAccount(req, res)
    await createLunchspace(req, res)
  })
  it('has permission', async () => {
    const req = mockReq({
      body: { subdomain: testSubdomain },
      token: { userId: testUserId },
    })
    const res = mockRes()
    const next = mockNext()
    await checkPermission(req, res, next)
    expect(next).not.toBeCalledWith(expect.any(Error))
  })
  it('has no permission permission', async () => {
    const req = mockReq({
      body: { subdomain: testSubdomain },
      token: { userId: testUserId2 },
    })
    const res = mockRes()
    const next = mockNext()
    await checkPermission(req, res, next)
    expect(next).toBeCalledWith(expect.any(Error))
  })
  it('has no token', async () => {
    const req = mockReq({
      body: { subdomain: testSubdomain },
    })
    const res = mockRes()
    const next = mockNext()
    await checkPermission(req, res, next)
    expect(next).toBeCalledWith(expect.any(Error))
  })
})
