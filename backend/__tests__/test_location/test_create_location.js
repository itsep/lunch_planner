const { createLocation, create } = require('../../routes/location/create_location')
const { createLunchspaceAndJoin } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
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
    const req = mockReq({
      body: { lunchspaceName: 'Test Space', lunchspaceSubdomain: 'test-space' },
      token: { userId: 1 },
    })
    const res = mockRes()
    await pool.execute('INSERT INTO user (first_name, last_name)' +
      'VALUES (?, ?)', ['Max', 'Mustermann'])
    await createLunchspaceAndJoin(req, res)
  })
  describe('create', async () => {
    it('should create a location in DB', async () => {
      await expect(create(testName, testCoordinates, testLunchspaceId)).resolves.not.toThrow()
    })
  })
  describe('createLocation', async () => {
    it('should create a new location in DB', async () => {
      const req = mockReq({
        body: { name: testName, coordinates: testCoordinates },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should fail (name too short)', async () => {
      const req = mockReq({
        body: { name: testName2, coordinates: testCoordinates },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(409)
    })
    it('should fail (illegal coordinates)', async () => {
      const req = mockReq({
        body: { name: testName, coordinates: testCoordinates2 },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(409)
    })
  })
})
