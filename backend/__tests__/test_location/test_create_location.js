const { createLocation, create } = require('../../routes/location/create_location')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')

const testName = 'McBurger'
const testName2 = ''
const testCoordinates = { lat: 20, long: 10 }
const testCoordinates2 = 'test'
const testLunchspaceId = 1

describe('create location', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const setUpRequest = {
      body: { lunchspaceName: 'Test Space', lunchspaceSubdomain: 'test-space' },
      token: { userId: 1 },
    }
    const req = mockReq(setUpRequest)
    const res = mockRes()
    await pool.execute('INSERT INTO user (first_name, last_name)' +
      'VALUES (?, ?)', ['Max', 'Mustermann'])
    await createLunchspace(req, res)
  })
  describe('create', async () => {
    it('should create a location in DB', async () => {
      await expect(create(testName, testCoordinates, testLunchspaceId)).resolves.not.toThrow()
    })
  })
  describe('createLocation', async () => {
    const request1 = {
      body: { name: testName, coordinates: testCoordinates },
      lunchspace: { id: testLunchspaceId },
    }
    const request2 = {
      body: { name: testName2, coordinates: testCoordinates },
      lunchspace: { id: testLunchspaceId },
    }
    const request3 = {
      body: { name: testName, coordinates: testCoordinates2 },
      lunchspace: { id: testLunchspaceId },
    }
    it('should create a new location in DB', async () => {
      const req = mockReq(request1)
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should fail (name too short)', async () => {
      const req = mockReq(request2)
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(409)
    })
    it('should fail (illegal coordinates)', async () => {
      const req = mockReq(request3)
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(500)
    })
  })
})
