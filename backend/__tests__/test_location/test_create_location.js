const { createLocation, create } = require('../../routes/location/create_location')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')

const testName = 'McBurger'
const testCoordinates = [{ lat: 10.02, long: 20.5 }]
const testLunchspaceId = 1

describe('create location', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  describe('create', async () => {
    it('should create a location in DB', async () => {
      await expect(create(testName, testCoordinates, testLunchspaceId)).resolves.not.toThrow()
    })
  })
  describe('createLocation', async () => {
    const request = {
      body: { name: testName, coordinates: testCoordinates, lunchspaceId: testLunchspaceId },
      token: { userId: 1 },
    }
    it('should create a new lunchspace', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(200)
    })
  })
})
