const { isMember } = require('../../lib/supportive_functions')
const { InputValidationError } = require('../../../shared/lib/error')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const lunchspace = require('../../routes/lunchspace/create_lunchspace')
const { connect } = require('./create_lunchspace.js')

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

describe('join_lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId1 } = await account.create(testEMail1, testPassword1,
      testFirstName1, testLastName1)
    testUserId1 = userId1
    const { userId2 } = await account.create(testEMail2, testPassword2,
      testFirstName2, testLastName2)
    testUserId2 = userId2
    lunchspaceId1 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain1)
    lunchspaceId2 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain2)
    lunchspaceId3 = await lunchspace.create(testLunchspaceName, testLunchspaceSubdomain3)

  })
})
