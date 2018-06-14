const { getLocations, getLocationsAndParticipants } = require('../../routes/location/get_locations')
const location = require('../../routes/location/create_location')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { joinEvent } = require('../../routes/event/join_event.js')

const testSpaceName = 'testspace'
const testSpaceSubdomain = 'test-space-subdomain'
const testLocationName = 'McBurger'
const testLocationCoordinates = { lat: 20, long: 10 }
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'password'
const eventDate = '2018-05-16'
const eventTime = '12:30:00'

// let testUserId
let testLunchspaceId
let testLocationId
let testUserId

describe('get locations', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(testEmail, testPassword, testFirstName, testLastName)
    testUserId = userId
    testLunchspaceId = await createLunchspace(userId, testSpaceName, testSpaceSubdomain)
    testLocationId = await location
      .create(testLocationName, testLocationCoordinates, testLunchspaceId)
    await joinEvent(userId, testLocationId, eventTime, eventDate)
  })
  it('should return locations and participants', async () => {
    const locations = await getLocationsAndParticipants(testLunchspaceId, eventDate)
    expect(locations).toMatchObject({
      locationsInLunchspace: [testLocationId],
      locations: {
        [testLocationId]:
        {
          name: testLocationName,
          coordinates: testLocationCoordinates,
          participantsAtTimestamp: {
            [eventTime]: [testUserId],
          },
        },
      },
      users: {
        [testUserId]: {
          firstName: testFirstName,
          lastName: testLastName,
          imageUrl: null,
        },
      },
    })
  })
  it('should result with status 200', async () => {
    const req = mockReq({
      lunchspace: { id: testLunchspaceId },
      query: { date: '2018-05-18' },
    })
    const res = mockRes()
    await getLocations(req, res)
    expect(res.status).lastCalledWith(200)
  })
})
