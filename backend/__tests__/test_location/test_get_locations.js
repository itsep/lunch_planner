const { getLocations, getLocationsAndParticipants } = require('../../routes/location/get_locations')
const location = require('../../routes/location/create_location')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')

const testSpaceName = 'testspace'
const testSpaceSubdomain = 'test-space-subdomain'
const testLocationName = 'McBurger'
const testLocationCoordinates = { lat: 20, long: 10 }
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'password'

// let testUserId
let testLunchspaceId
let testLocationId

describe('get locations', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(testEmail, testPassword, testFirstName, testLastName)
    testLunchspaceId = await createLunchspace(userId, testSpaceName, testSpaceSubdomain)
    testLocationId = await location
      .create(testLocationName, testLocationCoordinates, testLunchspaceId)
  })
  it('should return locations and participants', async () => {
    const { locations } = await getLocationsAndParticipants(testLunchspaceId)
    expect(locations[0]).toMatchObject({
      id: testLocationId,
      name: testLocationName,
      coordinates: testLocationCoordinates,
    })
    expect(locations.length).toEqual(1)
  })
  it('should result with status 200', async () => {
    const req = mockReq({
      lunchspace: { id: testLunchspaceId },
    })
    const res = mockRes()
    await getLocations(req, res)
    expect(res.status).lastCalledWith(200)
  })
})
