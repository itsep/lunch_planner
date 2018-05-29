const { leaveEvent, leaveEventRoute } = require('../../routes/event/leave_event')
const { joinEvent } = require('../../routes/event/join_event')
const location = require('../../routes/location/create_location')
const account = require('../../routes/account/register_account')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { InputValidationError } = require('../../../shared/lib/error')

const testSpaceName = 'testspace'
const testSpaceSubdomain = 'test-space-subdomain'
const testLocationName = 'McBurger'
const testLocationCoordinates = { lat: 20, long: 10 }
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'password'
const testTime = '10:30'
const testDate = '2018-10-12'
const illegalTestTime = 'crap'
const legalTestTime = { hour: 22, minute: 35 }
const illegalTestDate = 15
const legalTestDate = { year: 2018, month: 5, day: 15 }

let testUserId
let testLunchspaceId
let testLocationId

describe('leave_event', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(testEmail, testPassword, testFirstName, testLastName)
    testUserId = userId
    testLunchspaceId = await createLunchspace(testUserId, testSpaceName, testSpaceSubdomain)
    testLocationId = await location
      .create(testLocationName, testLocationCoordinates, testLunchspaceId)
    await joinEvent(testUserId, testLocationId, testTime, testDate)
  })
  describe('leaveEvent', async () => {
    it('should delete a join_up_at entry in DB', async () => {
      await expect(leaveEvent(testUserId, testLocationId, testTime, testDate))
        .resolves.not.toThrow()
    })
  })
  describe('leaveEventRoute', async () => {
    it('should leave the event', async () => {
      const req = mockReq({
        body: { locationId: testLocationId, eventTime: legalTestTime, eventDate: legalTestDate },
        token: { userId: testUserId },
      })
      const res = mockRes()
      await expect(leaveEventRoute(req, res))
        .resolves.not.toThrow()
    })
    it('should throw an error (illegal time)', async () => {
      const req = mockReq({
        body: { locationId: testLocationId, eventTime: illegalTestTime, eventDate: legalTestDate },
        token: { userId: testUserId },
      })
      const res = mockRes()
      const leaveEventRoutePromise = leaveEventRoute(req, res)
      await expect(leaveEventRoutePromise).rejects.toThrowError(InputValidationError)
      await expect(leaveEventRoutePromise).rejects.toHaveProperty('property', 'eventTime')
    })
    it('should throw an error (illegal date)', async () => {
      const req = mockReq({
        body: { locationId: testLocationId, eventTime: legalTestTime, eventDate: illegalTestDate },
        token: { userId: testUserId },
      })
      const res = mockRes()
      const leaveEventRoutePromise = leaveEventRoute(req, res)
      await expect(leaveEventRoutePromise).rejects.toThrowError(InputValidationError)
      await expect(leaveEventRoutePromise).rejects.toHaveProperty('property', 'eventDate')
    })
  })
})
