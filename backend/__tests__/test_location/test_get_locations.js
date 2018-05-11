const { getLocations } = require('../../routes/location/get_locations')
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

let testUserId
let testLunchspaceId
let testLocationId

describe('get locations', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    testUserId = await account.create(testEmail, testPassword, testFirstName, testLastName)
    testLunchspaceId = await createLunchspace(1, testSpaceName, testSpaceSubdomain)
    testLocationId = await location
      .create(testLocationName, testLocationCoordinates, testLunchspaceId)
  })
  it('should result Locations with correct data', async () => {
    const req = mockReq({
      lunchspace: { id: testLunchspaceId },
    })
    const res = mockRes()
    expect(await getLocations(req, res)).lastCalledWith(200)
  })
  it('should return error', async () => {
    console.log('INSERT TEST!')
  })
})
