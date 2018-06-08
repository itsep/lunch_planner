const { isMember, isAdmin, lunchspaceExists } = require('../../lib/supportive_functions')
const { NeedsUserConfirmation } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { connect } = require('../../routes/lunchspace/create_lunchspace')
const location = require('../../routes/location/create_location')
const { joinEvent } = require('../../routes/event/join_event')
const {
  passAdminRightsAndCheckForDeletion, leaveLunchspaceRoute,
  leaveEvents, leaveLunchspace, deleteLunchspace,
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

describe('leave_lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    /*
    -creates two users and three lunchspaces
    -user 1 is admin of all lunchspaces, user 2 is member of all lunchspaces
    -lunchspace 1 has two locations, lunchspace 3 has one location
    -user 1 joins events at location 1 and 2, user 2 joins events at location 2 and 3
     */
    const user1 = await account.create(
      testEMail1, testPassword1,
      testFirstName1, testLastName1
    )
    testUserId1 = user1.userId
    const user2 = await account.create(
      testEMail2, testPassword2,
      testFirstName2, testLastName2
    )
    testUserId2 = user2.userId
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
    locationId3 = await location.create(locationName, locationCoordinates, lunchspaceId3)
    await joinEvent(testUserId2, locationId1, '13:30', '2018-06-07')
    await joinEvent(testUserId2, locationId2, '13:00', '2018-06-07')
    await joinEvent(testUserId2, locationId1, '13:30', '2018-07-07')
    await joinEvent(testUserId2, locationId2, '13:00', '2018-07-07')
    await joinEvent(testUserId2, locationId1, '13:30', '2008-06-07')
    await joinEvent(testUserId2, locationId2, '13:00', '2008-07-07')
    await joinEvent(testUserId1, locationId1, '13:30', '2018-06-07')
    await joinEvent(testUserId1, locationId1, '13:00', '2018-06-07')
    await joinEvent(testUserId1, locationId1, '13:30', '2018-07-07')
    await joinEvent(testUserId1, locationId1, '13:00', '2018-07-07')
    await joinEvent(testUserId1, locationId1, '13:30', '2008-06-07')
    await joinEvent(testUserId1, locationId1, '13:00', '2008-07-07')
    await joinEvent(testUserId1, locationId3, '13:00', '2018-07-07')
    await joinEvent(testUserId1, locationId3, '13:30', '2008-06-07')
    await joinEvent(testUserId1, locationId3, '13:00', '2008-07-07')
  })
  // user 2 leaves all events in lunchspace 1
  describe('leaveEvents', () => {
    it('should delete user from all events in lunchspace', async () => {
      await expect(leaveEvents(testUserId2, lunchspaceId1)).resolves.not.toThrow()
    })
    it('should delete user from all events in lunchspace, even if he is in none', async () => {
      await expect(leaveEvents(testUserId2, lunchspaceId1)).resolves.not.toThrow()
    })
  })
  // user 2 leaves lunchspace 1
  describe('leaveLunchspace', () => {
    it('should delete user from lunchspace', async () => {
      await expect(leaveLunchspace(testUserId2, lunchspaceId1)).resolves.not.toThrow()
      await expect(isMember(testUserId2, lunchspaceId1)).resolves.toEqual(false)
    })
    it('should delete user from lunchspace, even if he is not in it', async () => {
      await expect(leaveLunchspace(testUserId2, lunchspaceId1)).resolves.not.toThrow()
      await expect(isMember(testUserId2, lunchspaceId1)).resolves.toEqual(false)
    })
  })
  describe('passAdminRightsAndCheckForDeletion', () => {
    // user 2 is no admin in lunchspace 2
    it('should not alter admin rights and return false', async () => {
      await expect(passAdminRightsAndCheckForDeletion(testUserId2, lunchspaceId2, false))
        .resolves.toEqual(false)
      await expect(isAdmin(testUserId2, lunchspaceId2)).resolves.toEqual(false)
    })
    // user 2 is stil no admin in lunchspace 2
    it('should not alter admin rights and return false, despite setting forceDelete true', async () => {
      await expect(passAdminRightsAndCheckForDeletion(testUserId2, lunchspaceId2, true))
        .resolves.toEqual(false)
      await expect(isAdmin(testUserId2, lunchspaceId2)).resolves.toEqual(false)
    })
    // user 2 becomes admin of lunchspace 2, user 1 is no longer admin
    it('should alter admin rights and return false', async () => {
      await expect(passAdminRightsAndCheckForDeletion(testUserId1, lunchspaceId2, false))
        .resolves.toEqual(false)
      await expect(isAdmin(testUserId1, lunchspaceId2)).resolves.toEqual(false)
      await expect(isAdmin(testUserId2, lunchspaceId2)).resolves.toEqual(true)
    })
    // user 1 stays admin in lunchspace 1
    it('should not alter admin rights and return an error', async () => {
      await expect(passAdminRightsAndCheckForDeletion(testUserId1, lunchspaceId1, false))
        .rejects.toThrowError(NeedsUserConfirmation)
      await expect(isAdmin(testUserId1, lunchspaceId1)).resolves.toEqual(true)
    })
    // user 1 stays admin in lunchspace 1, but lunchspace 1 is free to delete
    it('should not alter admin rights and return true', async () => {
      await expect(passAdminRightsAndCheckForDeletion(testUserId1, lunchspaceId1, true))
        .resolves.toEqual(true)
      await expect(isAdmin(testUserId1, lunchspaceId1)).resolves.toEqual(true)
    })
  })
  // lunchspace 1 gets deleted
  describe('deleteLunchspace', () => {
    it('should delete Lunchspace', async () => {
      await expect(deleteLunchspace(lunchspaceId1)).resolves.not.toThrow()
      await expect(lunchspaceExists(lunchspaceId1)).resolves.toEqual(false)
    })
    it('should delete Lunchspace, even if it does not exist', async () => {
      await expect(deleteLunchspace(lunchspaceId1)).resolves.not.toThrow()
      await expect(lunchspaceExists(lunchspaceId1)).resolves.toEqual(false)
    })
  })
  describe('leaveLunchspaceRoute', () => {
    // user 2 leaves Lunchspace 3
    it('should delete user from lunchspace and its events', async () => {
      const req = mockReq({
        token: {
          userId: testUserId2,
        },
        lunchspace: {
          id: lunchspaceId3,
        },
        body: {
          forceDelete: false,
        },
      })
      const res = mockRes()
      await leaveLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(isMember(testUserId2, lunchspaceId3)).resolves.toEqual(false)
      await expect(lunchspaceExists(lunchspaceId3)).resolves.toEqual(true)
      await expect(isAdmin(testUserId1, lunchspaceId3)).resolves.toEqual(true)
    })
    // user 1 tries leaving lunchspace 3
    it('should not delete user from lunchspace and throw an error', async () => {
      const req = mockReq({
        token: {
          userId: testUserId1,
        },
        lunchspace: {
          id: lunchspaceId3,
        },
        body: {
          forceDelete: false,
        },
      })
      const res = mockRes()
      await expect(leaveLunchspaceRoute(req, res)).rejects.toThrowError(NeedsUserConfirmation)
      await expect(isMember(testUserId1, lunchspaceId3)).resolves.toEqual(true)
      await expect(lunchspaceExists(lunchspaceId3)).resolves.toEqual(true)
      await expect(isAdmin(testUserId1, lunchspaceId3)).resolves.toEqual(true)
    })
    // user 1 leaves lunchspace 3, lunchspace 3 gets deleted
    it('should delete user from lunchspace and delete lunchspace', async () => {
      const req = mockReq({
        token: {
          userId: testUserId1,
        },
        lunchspace: {
          id: lunchspaceId3,
        },
        body: {
          forceDelete: true,
        },
      })
      const res = mockRes()
      await leaveLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(isMember(testUserId1, lunchspaceId3)).resolves.toEqual(false)
      await expect(lunchspaceExists(lunchspaceId3)).resolves.toEqual(false)
    })
    // user 2 leaves lunchspace 2, user 1 becomes admin
    it('should delete user from lunchspace and alter admin rights', async () => {
      const req = mockReq({
        token: {
          userId: testUserId2,
        },
        lunchspace: {
          id: lunchspaceId2,
        },
        body: {
          forceDelete: false,
        },
      })
      const res = mockRes()
      await leaveLunchspaceRoute(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(isMember(testUserId2, lunchspaceId2)).resolves.toEqual(false)
      await expect(isMember(testUserId1, lunchspaceId2)).resolves.toEqual(true)
      await expect(lunchspaceExists(lunchspaceId2)).resolves.toEqual(true)
      await expect(isAdmin(testUserId1, lunchspaceId2)).resolves.toEqual(true)
    })
  })
})
