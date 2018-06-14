const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { create } = require('../../routes/lunchspace/create_lunchspace')
const { getToken } = require('../../routes/lunchspace/invite_lunchspace')
const { checkInvitation, getLunchspaceNameAndSubdomain, checkTokenAndGetLunchspaceId } = require('../../routes/lunchspace/check_invitation')
const { InputValidationError } = require('../../../shared/lib/error')

const testLunchspaceName = 'testLunchspace'
const testLunchspaceSubdomain = 'test-lunchspace'
const testLunchspace = {
  name: testLunchspaceName,
  subdomain: testLunchspaceSubdomain,
}
const testEmail = 'noreply.lunchspace@gmail.com'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const notALunchspaceId = 999
let lunchspaceId = 1
const invalidToken = 'invalid token'
let token = 1

describe('check_invitation', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    lunchspaceId = await create(testLunchspaceName, testLunchspaceSubdomain)
    token = await getToken(testEmail, lunchspaceId)
  })
  describe('checkToken', () => {
    it('should return the lunchspaceId of testLunchspace', async () => {
      await expect(checkTokenAndGetLunchspaceId(token)).resolves.toEqual(lunchspaceId)
    })
    it('should return false', async () => {
      await expect(checkTokenAndGetLunchspaceId(invalidToken))
        .rejects.toThrowError(InputValidationError)
    })
  })
  describe('getLunchspaceNameAndSubdomain', () => {
    it('should return the name and subdomain of testLunchspace', async () => {
      await expect(getLunchspaceNameAndSubdomain(lunchspaceId))
        .resolves.toEqual(testLunchspace)
    })
    it('should return undefined', async () => {
      await expect(getLunchspaceNameAndSubdomain(notALunchspaceId))
        .rejects.toThrowError(InputValidationError)
    })
  })
  describe('checkInvitation', () => {
    it('should return an object with the names of user and lunchspace', async () => {
      const req = mockReq({
        userPromise: {
          firstName: testFirstName,
          lastName: testLastName,
        },
        query: {
          token,
        },
      })
      const res = mockRes()
      await checkInvitation(req, res)
      const result = res.json.mock.calls[0][0]
      expect(result).toMatchObject({
        firstName: testFirstName,
        lastName: testLastName,
        lunchspace: testLunchspace,
      })
    })
    it('should reject to InputValidationError', async () => {
      const req = mockReq({
        userPromise: {
          firstName: testFirstName,
          lastName: testLastName,
        },
        query: {
          token: invalidToken,
        },
      })
      const res = mockRes()
      await expect(checkInvitation(req, res)).rejects.toThrowError(InputValidationError)
    })
  })
})
