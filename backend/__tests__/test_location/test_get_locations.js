const { getLocations } = require('../../routes/location/get_locations')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')


describe('get locations', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  // TODO: create Lunchspace und create Locations
  beforeAll()
  it('should result Locations', () => {
    const req = mockReq()
    const res = mockRes()
    getLocations(req, res)
    console.log('INSERT TEST!')
  })
  it('should return error', () => {
    console.log('INSERT TEST!')
  })
})
