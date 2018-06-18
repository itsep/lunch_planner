const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { getToken } = require('../../routes/lunchspace/invite_lunchspace')
const { joinLunchspace, invalidateToken } = require('../../routes/lunchspace/join_lunchspace')
const { InputValidationError } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')
const { checkTokenAndGetLunchspaceId } = require('../../routes/lunchspace/check_invitation')
const { isMember } = require('../../lib/supportive_functions')

const testEmail = 'noreply.lunchspace@gmail.com'
const testPassword = 'password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testLanguage = 'de'
let testUserId = 1

const testLunchspaceName = 'testLunchspace'
const testLunchspaceSubdomain1 = 'test-lunchspace1'
const testLunchspaceSubdomain2 = 'test-lunchspace2'
const testLunchspaceSubdomain3 = 'test-lunchspace3'
let lunchspaceId1 = 1
let lunchspaceId2 = 2
let lunchspaceId3 = 3

let token1 = 1
let token2 = 2
let token3 = 3
const invalidToken = 'not a valid token'


describe('join_lunchspace', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(
      testEmail,
      testPassword,
      testFirstName,
      testLastName,
      testLanguage
    )
    testUserId = userId
    lunchspaceId1 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain1)
    lunchspaceId2 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain2)
    lunchspaceId3 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain3)
    token1 = await getToken(testEmail, lunchspaceId1)
    token2 = await getToken(testEmail, lunchspaceId2)
    token3 = await getToken(testEmail, lunchspaceId3)
  })
  describe('joinLunchspace', () => {
    it('should add test user to test lunchspace and ivalidatae token', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        query: {
          token: token1,
        },
        body: {
          wantsToJoin: true,
        },
      })
      const res = mockRes()
      await joinLunchspace(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(checkTokenAndGetLunchspaceId(token1)).rejects.toThrowError(InputValidationError)
      await expect(isMember(testUserId, lunchspaceId1)).resolves.toEqual(true)
    })
    it('should not add test user, but invalidate token', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        query: {
          token: token2,
        },
        body: {
          wantsToJoin: false,
        },
      })
      const res = mockRes()
      await joinLunchspace(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(checkTokenAndGetLunchspaceId(token2)).rejects.toThrowError(InputValidationError)
      await expect(isMember(testUserId, lunchspaceId2)).resolves.toEqual(false)
    })
    it('should throw a InputValidationError', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        query: {
          token: invalidToken,
        },
        body: {
          wantsToJoin: true,
        },
      })
      const res = mockRes()
      await expect(joinLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
  })
  describe('invalidateToken', () => {
    it('should invalidate token', async () => {
      await invalidateToken(token3)
      await expect(checkTokenAndGetLunchspaceId(token3)).rejects.toThrowError(InputValidationError)
    })
    it('should not throw an error', async () => {
      await expect(invalidateToken(invalidToken)).resolves.not.toThrow()
    })
  })
})
