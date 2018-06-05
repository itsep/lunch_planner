const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { getToken } = require('../../routes/lunchspace/invite_lunchspace')
const { joinLunchspace, invalidateToken } = require('../../routes/lunchspace/join_lunchspace')
const { InputValidationError } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')

const testEMail = 'noreply.lunchspace@gmail.com'
const testPassword = 'password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
let testUserId = 1

const testLunchspaceName = 'testLunchspace'
const testLunchspaceSubdomain = 'test-lunchspace'
let lunchspaceId = 1

let token = 1


describe('join_lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(testEMail, testPassword, testFirstName, testLastName)
    testUserId = userId
    lunchspaceId = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain)
    token = await getToken(testEMail, lunchspaceId)
  })
  describe('joinLunchspace', () => {
    it('should add test user to test lunchspace', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        query: {
          token,
        },
        body: {
          wantsToJoin: true,
        },
      })
      const res = mockRes()
      await joinLunchspace(req, res)
      expect(res.status).lastCalledWith(200)
    })
  })
})
