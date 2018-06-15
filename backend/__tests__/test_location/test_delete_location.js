const { locationExists } = require('../../lib/supportive_functions')
const { NeedsUserConfirmation } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { connect } = require('../../routes/lunchspace/create_lunchspace')
const location = require('../../routes/location/create_location')
const { joinEvent } = require('../../routes/event/join_event')
const { deleteLocation, checkForFutureEvents } = require('../../routes/location/delete_location')
const { dateForSQL } = require('../../lib/formatation')
const { toEventDate } = require('../../../shared/lib/event')

const email = 'noreply.lunchspace@gmail.com'
const password = 'password'
const firstName = 'Max'
const lastName = 'Mustermann'
const testLanguage = 'de'
let testUserId = 1

const testLunchspaceName = 'testLunchspace'
const testLunchspaceSubdomain1 = 'test-lunchspace1'
const testLunchspaceSubdomain2 = 'test-lunchspace2'
let lunchspaceId1 = 1
let lunchspaceId2 = 2

const locationName = 'Zeitgeist'
const locationCoordinates = { lat: 10, long: 10 }
let locationId1 = 1
let locationId2 = 2
let locationId3 = 3

const today = dateForSQL(toEventDate(new Date()))

describe('delete_location', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(
      email, password,
      firstName, lastName,
      testLanguage,
    )
    testUserId = userId

    lunchspaceId1 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain1)
    lunchspaceId2 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain2)
    await connect(testUserId, lunchspaceId1, true)

    locationId1 = await location.create(locationName, locationCoordinates, lunchspaceId1)
    locationId2 = await location.create(locationName, locationCoordinates, lunchspaceId1)
    locationId3 = await location.create(locationName, locationCoordinates, lunchspaceId2)

    await joinEvent(testUserId, locationId1, '13:30', '2018-06-07')
    await joinEvent(testUserId, locationId2, '13:30', '2018-06-07')
    await joinEvent(testUserId, locationId3, '13:30', '2018-06-07')
    await joinEvent(testUserId, locationId1, '13:30', '3018-06-07')
    await joinEvent(testUserId, locationId2, '13:30', today)
  })
  describe('ckeckForFutureEvents', () => {
    it('should do nothing', async () => {
      await expect(checkForFutureEvents(locationId3)).resolves.not.toThrow()
    })
    it('should throw a NeedsUserConfirmation, because of event in the future', async () => {
      await expect(checkForFutureEvents(locationId1)).rejects.toThrowError(NeedsUserConfirmation)
    })
    it('should throw a NeedsUserConfirmation, beaceuse of event today', async () => {
      await expect(checkForFutureEvents(locationId2)).rejects.toThrowError(NeedsUserConfirmation)
    })
  })
  describe('deleteLocation', () => {
    it('should resolve to throw NeedsUserConfirmation', async () => {
      const req = mockReq({
        lunchspace: {
          id: lunchspaceId1,
        },
        body: {
          locationId: locationId1,
          forceDelete: false,
        },
      })
      const res = mockRes()
      await expect(deleteLocation(req, res)).rejects.toThrowError(NeedsUserConfirmation)
      await expect(locationExists(locationId1)).resolves.toEqual(true)
    })
    it('should resolve to status 200 and delete location 1', async () => {
      const req = mockReq({
        lunchspace: {
          id: lunchspaceId1,
        },
        body: {
          locationId: locationId1,
          forceDelete: true,
        },
      })
      const res = mockRes()
      await deleteLocation(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(locationExists(locationId1)).resolves.toEqual(false)
    })
    it('should resolve to throw NeedsUserConfirmation', async () => {
      const req = mockReq({
        lunchspace: {
          id: lunchspaceId1,
        },
        body: {
          locationId: locationId2,
          forceDelete: false,
        },
      })
      const res = mockRes()
      await expect(deleteLocation(req, res)).rejects.toThrowError(NeedsUserConfirmation)
      await expect(locationExists(locationId2)).resolves.toEqual(true)
    })
    it('should resolve to status 200 and delete location 2', async () => {
      const req = mockReq({
        lunchspace: {
          id: lunchspaceId1,
        },
        body: {
          locationId: locationId2,
          forceDelete: true,
        },
      })
      const res = mockRes()
      await deleteLocation(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(locationExists(locationId2)).resolves.toEqual(false)
    })
    it('should resolve to status 200, without deleting, because of wrong lunchspace', async () => {
      const req = mockReq({
        lunchspace: {
          id: lunchspaceId1,
        },
        body: {
          locationId: locationId3,
          forceDelete: false,
        },
      })
      const res = mockRes()
      await deleteLocation(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(locationExists(locationId3)).resolves.toEqual(true)
    })
  })
})
