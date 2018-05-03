const { create, registerAccount } = require('../../routes/account/register_account')
const { mockReq, mockRes } = require('../../lib/express_mock')

const testEmail1 = 'test-register@email.com1'
const testPassword1 = 'test-register-password1'
const testEmail2 = 'test-register@email.com2'
const testPassword2 = 'test-register-password2'

describe('register accounts', () => {
  describe('create', async () => {
    it('should create a new account in DB, without error', async () => {
      const error = await create(testEmail1, testPassword1)
      expect(error).equal(true)
    })
    it('should throw an error', async () => {
      //const error = await create(testEmail1, testPassword1)
      //expect(error.code).equal('ER_DUP_ENTRY')
    })
  })
  describe('registerAccount', () => {
    const request = { body: { email: testEmail2, password: testPassword2 } }
    const req = mockReq(request)
    const res = mockRes()
    it('should register a new account', async () => {
      await registerAccount(req, res)
      expect(res.status).to.be.calledWith(200)
    })
    it('should reject to register a new account', async () => {
      await registerAccount(req, res)
      expect(res.status).to.be.calledWith(500)
    })
  })
})
