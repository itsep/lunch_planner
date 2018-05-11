const { getLocations } = require('../../routes/location/get_locations')
const { createLocation } = require('../../routes/location/create_location')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { registerAccount } = require('../../routes/account/register_account')
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
    const req = mockReq({
      body: {
        lunchspaceName: testSpaceName,
        lunchspaceSubdomain: testSpaceSubdomain,
        coordinates: testLocationCoordinates,
        name: testLocationName,
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max.mustermann@gmail.com',
        password: 'passwort',
      },
      token: { userId: 1 },
      lunchspace: { id: 1 },
    })
    const res = mockRes()
    await registerAccount(req, res)
    await createLunchspace(req, res)
    await createLocation(req, res)
    await createLocation(req, res)
  })
  it('should result Locations', async () => {
    const req = mockReq({
      lunchspace: { id: 1 },
    })
    const res = mockRes()
    await getLocations(req, res)
    console.log('INSERT TEST!')
  })
  it('should return error',async () => {
    console.log('INSERT TEST!')
  })
})
