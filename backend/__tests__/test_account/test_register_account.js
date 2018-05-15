const { create, registerAccount } = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')

const testEmail1 = 'test-register1@gmail.com'
const testPassword1 = 'test-register-password1'
const testEmail2 = 'test-register2@gmail.com'
const testPassword2 = 'test-register-password2'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testFirstName2 = '    '
const testLastName2 = 'von und zu Nahasapeemapetilon'
const testEmail3 = 'max@mustermann@gmail.com'

describe('register accounts', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  describe('create', async () => {
    it('should create a new account in DB, without error', async () => {
      await expect(create(
        testEmail1,
        testPassword1,
        testFirstName,
        testLastName
      )).resolves.toEqual(expect.any(Number))
    })
    it('should throw an error', async () => {
      await expect(create(testEmail1, testPassword1, testFirstName, testLastName)).rejects.toHaveProperty('code', 'ER_DUP_ENTRY')
    })
  })
  describe('registerAccount', () => {
    const request = {
      body: {
        email: testEmail2,
        password: testPassword2,
        firstName: testFirstName,
        lastName: testLastName,
      },
    }
    it('should register a new account', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await registerAccount(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should reject to register a new account', async () => {
      const req = mockReq(request)
      const res = mockRes()
      await registerAccount(req, res)
      expect(res.status).lastCalledWith(500)
    })
    it('should reject to register a new account (first name too short)', async () => {
      const req = mockReq({
        body: {
          email: testEmail2,
          password: testPassword2,
          firstName: testFirstName2,
          lastName: testLastName,
        },
      })
      const res = mockRes()
      await registerAccount(req, res)
      expect(res.status).lastCalledWith(409)
    })
    it('should reject to register a new account (last name too long)', async () => {
      const req = mockReq({
        body: {
          email: testEmail2,
          password: testPassword2,
          firstName: testFirstName,
          lastName: testLastName2,
        },
      })
      const res = mockRes()
      await registerAccount(req, res)
      expect(res.status).lastCalledWith(409)
    })
    it('should reject to register a new account (invalid email address', async () => {
      const req = mockReq({
        body: {
          email: testEmail3,
          password: testPassword2,
          firstName: testFirstName,
          lastName: testLastName,
        },
      })
      const res = mockRes()
      await registerAccount(req, res)
      expect(res.status).lastCalledWith(409)
    })
  })
})
