const { create, registerAccount } = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')
const { mockReq, mockRes } = require('../../lib/express_mock')

const testEmail1 = 'test-register@email.com1'
const testPassword1 = 'test-register-password1'
const testEmail2 = 'test-register@email.com2'
const testPassword2 = 'test-register-password2'
const testFirstName = 'Max'
const testLastName = 'Mustermann'

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
  })
})
