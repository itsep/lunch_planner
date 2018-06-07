const { isMember, isAdmin, lunchspaceExists } = require('../../lib/supportive_functions')
const { InputValidationError } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { connect } = require('../../routes/lunchspace/create_lunchspace')
const location = require('../../routes/location/create_location')
const { joinEvent } = require('../../routes/event/join_event')
const {
  passAdminRightsAndCheckForDeletion, leaveLunchspaceRoute, leaveEvents, leaveLunchspace, deleteLunchspace
} = require('../../routes/lunchspace/leave_lunchspace')

const testEMail1 = 'noreply.lunchspace@gmail.com'
const testPassword1 = 'password'
const testFirstName1 = 'Max'
const testLastName1 = 'Mustermann'
let testUserId1 = 1

const testEMail2 = 'noreply.lunchspace2@gmail.com'
const testPassword2 = 'password'
const testFirstName2 = 'Jon'
const testLastName2 = 'Doe'
let testUserId2 = 2

const testLunchspaceName = 'testLunchspace'
const testLunchspaceSubdomain1 = 'test-lunchspace1'
const testLunchspaceSubdomain2 = 'test-lunchspace2'
const testLunchspaceSubdomain3 = 'test-lunchspace3'
let lunchspaceId1 = 1
let lunchspaceId2 = 2
let lunchspaceId3 = 3

const locationName = 'Zeitgeist'
const locationCoordinates = { lat: 10, long: 10 }
let locationId1 = 1
let locationId2 = 2
let locationId3 = 3

describe('join_lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId1 } = await account.create(
      testEMail1, testPassword1,
      testFirstName1, testLastName1
    )
    testUserId1 = userId1
    const { userId2 } = await account.create(
      testEMail2, testPassword2,
      testFirstName2, testLastName2
    )
    testUserId2 = userId2
    lunchspaceId1 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain1)
    lunchspaceId2 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain2)
    lunchspaceId3 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain3)
    await connect(testUserId1, lunchspaceId1, true)
    await connect(testUserId1, lunchspaceId2, true)
    await connect(testUserId1, lunchspaceId3, true)
    await connect(testUserId2, lunchspaceId1, false)
    await connect(testUserId2, lunchspaceId2, false)
    await connect(testUserId2, lunchspaceId3, false)
    locationId1 = await location.create(locationName, locationCoordinates, lunchspaceId1)
    locationId2 = await location.create(locationName, locationCoordinates, lunchspaceId1)
    locationId3 = await location.create(locationName, locationCoordinates, lunchspaceId1)
    joinEvent(testUserId2, locationId1, '13:30', '2018-06-07')
    joinEvent(testUserId2, locationId2, '13:00', '2018-06-07')
    joinEvent(testUserId2, locationId1, '13:30', '2018-07-07')
    joinEvent(testUserId2, locationId2, '13:00', '2018-07-07')
    joinEvent(testUserId2, locationId1, '13:30', '2008-06-07')
    joinEvent(testUserId2, locationId2, '13:00', '2008-07-07')
    joinEvent(testUserId1, locationId1, '13:30', '2018-06-07')
    joinEvent(testUserId1, locationId1, '13:00', '2018-06-07')
    joinEvent(testUserId1, locationId1, '13:30', '2018-07-07')
    joinEvent(testUserId1, locationId1, '13:00', '2018-07-07')
    joinEvent(testUserId1, locationId1, '13:30', '2008-06-07')
    joinEvent(testUserId1, locationId1, '13:00', '2008-07-07')
  })
  describe('leaveEvents', () => {
    it('should delete user from all events in lunchspace', async () => {
      await expect(leaveEvents(testUserId2, lunchspaceId1)).resolves.not.toThrowError
    })
    it('should delete user from all events in lunchspace, even if he is in none', async () => {
      await expect(leaveEvents(testUserId2, lunchspaceId1)).resolves.not.toThrowError
    })
  })
  describe('leaveLunchspace', () => {
    it('should delete user from lunchspace', async () => {
      
    })
    it('should delete user from lunchspace', async () => {

    })
  })
  describe('passAdminRightsAndCheckForDeletion', () => {
    it('should not alter admin rights and return false', async () => {

    })
    it('should alter admin rights and return false', async () => {

    })
    it('should not alter admin rights and return false', async () => {

    })
    it('should not alter admin rights and return true', async () => {

    })
  })
  describe('deleteLunchspace', () => {
    it('should delete Lunchspace', async () => {

    })
  })
  describe('leaveLunchspaceRoute', () => {
    it('should delete user from lunchspace and its events', async () => {

    })
  })
})
