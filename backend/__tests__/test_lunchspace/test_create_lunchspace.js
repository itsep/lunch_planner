const { createLunchspace, create, connect } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../lib/error')

const testSubdomain1 = 'vsf-experts'
const testLunchspaceName1 = 'vsf-experts'

const testSubdomain2 = 'food-plaza'
const testLunchspaceName2 = 'Food Plaza'

const testSubdomain3 = 'way-too-long-name-for-a-subdomain'
const testLunchspaceName3 = 'Way too long name for a lunchspace'

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
    testUserId = await pool.execute('INSERT INTO user (first_name, last_name)' +
      'VALUES (?, ?)', [firstName, lastName])
    testUserId = testUserId[0].insertId
  })
  describe('create', async () => {
    it('should create a new lunchspace in DB and giving back its id', async () => {
      await expect(create(testLunchspaceName1, testSubdomain1)).resolves.toEqual(expect.any(Number))
    })
    it('should throw an error', async () => {
      await expect(create(testLunchspaceName1, testSubdomain1)).rejects.toHaveProperty('code', 'ER_DUP_ENTRY')
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
  describe('createLunchspace', () => {
    const request =
      {
        body: { lunchspaceName: testLunchspaceName2, lunchspaceSubdomain: testSubdomain2 },
        token: { userId: testUserId },
      }
    it('should create a new lunchspace', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await createLunchspace(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should reject to create a new lunchspace, because of already exists', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
    it('should reject to create a new lunchspace, because of subdomain is null', async () => {
      const request1 = {
        body: { lunchspaceName: testLunchspaceName2, lunchspaceSubdomain: null },
        token: { userId: testUserId },
      }
      const req = mockReq(request1)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
    it('should reject to create a new lunchspace, because of name is null', async () => {
      const request2 = {
        body: { lunchspaceName: null, lunchspaceSubdomain: testSubdomain2 },
        token: { userId: testUserId },
      }
      const req = mockReq(request2)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
    it('should reject to create a new lunchspace, because of subdomain is too long', async () => {
      const request3 = {
        body: { lunchspaceName: testLunchspaceName2, lunchspaceSubdomain: testSubdomain3 },
        token: { userId: testUserId },
      }
      const req = mockReq(request3)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
    it('should reject to create a new lunchspace, because of name is too long', async () => {
      const request4 = {
        body: { lunchspaceName: testLunchspaceName3, lunchspaceSubdomain: testSubdomain2 },
        token: { userId: testUserId },
      }
      const req = mockReq(request4)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
    it('should reject to create a new lunchspace, because of name is empty string', async () => {
      const request5 = {
        body: { lunchspaceName: '', lunchspaceSubdomain: testSubdomain2 },
        token: { userId: testUserId },
      }
      const req = mockReq(request5)
      const res = mockRes()
      await expect(createLunchspace(req, res)).rejects.toThrowError(InputValidationError)
    })
  })
})
