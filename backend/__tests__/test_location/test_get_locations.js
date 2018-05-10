const { getLocations } = require('../../routes/location/get_locations')
const { createLocation } = require('../../routes/location/create_location')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')

const testSpaceName = 'testspace'
const testSpaceSubdomain = 'test-space-subdomain'
const testLocationName = 'McBurger'
const testLocationCoordinates = { lat: 20, long: 10 }

describe('get locations', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    let req = mockReq({
      body: { lunchspaceName: testSpaceName, lunchspaceSubdomain: testSpaceSubdomain },
      token: { userId: 1 },
    })
    let res = mockRes()
    await createLunchspace(req, res)
    req = mockReq({
      body: {
        coordinates: testLocationCoordinates,
        name: testLocationName,
      },
      lunchspace: { id: 1 },
    })
    res = mockRes()
    await createLocation(req, res)
  })
  it('should result Locations', () => {
    const req = mockReq({
      lunchspace: 1,
    })
    const res = mockRes()
    getLocations(req, res)
    console.log('INSERT TEST!')
  })
  it('should return error', () => {
    console.log('INSERT TEST!')
  })
})
