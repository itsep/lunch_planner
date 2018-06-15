const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const account = require('../../routes/account/register_account')
const { createLunchspaceAndJoin } = require('../../routes/lunchspace/create_lunchspace')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { asyncCheckLunchspacePermissionOfRequest } = require('../../middleware/lunchspace_permission')

const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'passwort'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testLanguage = 'de'

const testLunchspaceName = 'Testbude'
const testSubdomain = 'buden-tester'
let testUserId = 1
const testUserId2 = 2

describe('permission', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await await account.create(
      testEmail,
      testPassword,
      testFirstName,
      testLastName,
      testLanguage
    )
    testUserId = userId
    const req = mockReq({
      body: {
        lunchspaceName: testLunchspaceName,
        lunchspaceSubdomain: testSubdomain,
      },
      token: { userId: testUserId },
    })
    const res = mockRes()

    await createLunchspaceAndJoin(req, res)
  })
  it('has permission', async () => {
    const req = mockReq({
      query: { subdomain: testSubdomain },
      token: { userId: testUserId },
    })
    const res = mockRes()
    await asyncCheckLunchspacePermissionOfRequest(req, res)
  })
  it('has no permission permission', async () => {
    const req = mockReq({
      query: { subdomain: testSubdomain },
      token: { userId: testUserId2 },
    })
    const res = mockRes()
    await expect(asyncCheckLunchspacePermissionOfRequest(req, res)).rejects.toThrow()
  })
  it('has no token', async () => {
    const req = mockReq({
      query: { subdomain: testSubdomain },
    })
    const res = mockRes()
    await expect(asyncCheckLunchspacePermissionOfRequest(req, res)).rejects.toThrow()
  })
})
