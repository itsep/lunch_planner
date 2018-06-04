const { inviteLunchspaceRoute, getToken } = require('../../routes/lunchspace/invite_lunchspace')
const { create, connect } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')

const testSubdomain1 = 'vsf-experts'
const testLunchspaceName1 = 'vsf-experts'

const testSubdomain2 = 'food-plaza'
const testLunchspaceName2 = 'Food Plaza'

const testSubdomain3 = 'way-too-long-name-for-a-subdomain'
const testLunchspaceName3 = 'Way too long name for a lunchspace'

let testUserId = 1
const firstName = 'Max'
const lastName = 'Mustermann'

let testLunchspaceId = 1
const testIsAdmin = true

describe('create lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    testUserId = await pool.execute('INSERT INTO user (first_name, last_name)' +
      'VALUES (?, ?)', [firstName, lastName])
    testUserId = testUserId[0].insertId
    testLunchspaceId = await create(testLunchspaceName1, testSubdomain1)
    await connect(testUserId, testLunchspaceId, testIsAdmin)
  })
  describe('inviteLunchspaceRoute', () => {
    const request = {
      body: {
        receivers: ['marcmehrer@t-online.de'],
      },
      userPromise: {
        firstName,
        lastName,
      },
      lunchspace: {
        id: testLunchspaceId,
        name: testLunchspaceName1,
      },
    }
    it('should send an invite email', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await inviteLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
    })
  })
})
