const { createLunchspace, create, connect } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')
const { pool } = require('../../lib/subdomain')

const testUrl = 'vsf-experts'
const testLunchspaceName = 'vsf-experts'
let testUserId = 1
const firstName = 'Max'
const lastName = 'Mustermann'
const testLunchspaceId = 1
const testIsAdmin = true

describe('create lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  // Create a Test User in User to prevent foreign key constraints
  beforeAll(async () => {
    testUserId = await pool.execute('INSERT INTO user (first_name, last_name' +
    'VALUES (?,?)', [firstName, lastName])
  })
  describe('create', async () => {
    it('should create a new lunchspace in DB and giving back its id', async () => {
      // 1 may change to a different number with future tests
      await expect(create(testLunchspaceName, testUrl)).resolves.toEqual(1)
    })
    it('should throw an error', async () => {
      await expect(create(testLunchspaceName, testUrl)).rejects.toHaveProperty('code', 'ER_DUP_ENTRY')
    })
  })
  describe('connect', async () => {
    it('should create a member_of in DB, without throwing an error', async () => {
      await expect(connect(testUserId, testLunchspaceId, testIsAdmin)).resolves.not.toThrow()
    })
    it('should throw an error', async () => {
      await expect(connect(testUserId, testLunchspaceId, testIsAdmin)).rejects.toHaveProperty('code', 'ER_DUP_ENTRY')
    })
  })
})
