const { inviteLunchspaceRoute, getToken } = require('../../routes/lunchspace/invite_lunchspace')
const { create, connect } = require('../../routes/lunchspace/create_lunchspace')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { InputValidationError } = require('../../../shared/lib/error')

const testEmail = 'noreply.lunchspace@gmail.com'
const testPassword = 'password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testLanguage = 'de'
const testSubdomain1 = 'vsf-experts'
const testLunchspaceName1 = 'vsf-experts'

const legalTestEmail = 'noreply.lunchspace@gmail.com'
const illegalTestEmail = 'noreply.lunchspacegmail.com'

let testUserId = 1
const firstName = 'Max'
const lastName = 'Mustermann'

let testLunchspaceId = 1
const testIsAdmin = true

describe('create lunchspace', () => {
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
    testLunchspaceId = await create(testLunchspaceName1, testSubdomain1)
    await connect(testUserId, testLunchspaceId, testIsAdmin)
  })
  describe('inviteLunchspaceRoute', () => {
    it('should send an invite email', async () => {
      const req = mockReq({
        body: {
          receivers: [legalTestEmail],
        },
        userPromise: Promise.resolve({
          firstName,
          lastName,
        }),
        lunchspace: {
          id: testLunchspaceId,
          name: testLunchspaceName1,
        },
      })
      const res = mockRes()
      await inviteLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should send multiple invite email with same link', async () => {
      const req = mockReq({
        body: {
          receivers: [legalTestEmail, legalTestEmail, legalTestEmail, legalTestEmail],
        },
        userPromise: Promise.resolve({
          firstName,
          lastName,
        }),
        lunchspace: {
          id: testLunchspaceId,
          name: testLunchspaceName1,
        },
      })
      const res = mockRes()
      await inviteLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should throw an error', async () => {
      const req = mockReq({
        body: {
          receivers: [illegalTestEmail],
        },
        userPromise: Promise.resolve({
          firstName,
          lastName,
        }),
        lunchspace: {
          id: testLunchspaceId,
          name: testLunchspaceName1,
        },
      })
      const res = mockRes()
      await expect(inviteLunchspaceRoute(req, res)).rejects.toThrowError(InputValidationError)
    })
  })
  describe('getToken', async () => {
    it('should create a new token', async () => {
      await expect(getToken(legalTestEmail, testLunchspaceId)).resolves.toEqual(expect.any(String))
    })
    it('should get the same token two times', async () => {
      const token1 = await getToken(legalTestEmail, testLunchspaceId)
      const token2 = await getToken(legalTestEmail, testLunchspaceId)
      expect(token1).toEqual(token2)
    })
  })
})
