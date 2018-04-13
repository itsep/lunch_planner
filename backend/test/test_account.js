const account = require('../routes/account')
const { mockReq, mockRes } = require('sinon-express-mock')
const { pool } = require('../lib/database')

describe('account', () => {
  describe('count', () => {
    it('should return 0', async () => {
      const req = mockReq()
      const res = mockRes()
      await account.count(req, res)
      expect(res.json).to.be.calledWith({ count: 0 })
    })
    it('should return 1 after insertion', async () => {
      const user = ['dnadoba@gmail.com', 'awesome hashed password']
      await pool.execute('INSERT INTO account (account_email, account_hashed_password) VALUES (?, ?)', user)
      const req = mockReq()
      const res = mockRes()
      await account.count(req, res)
      expect(res.json).to.be.calledWith({ count: 1 })
    })
  })
  describe('create account', () => {
    it('should result 200', async () => {
      const request = { body: { email: 'niceemail@email.de', password: 'newPassword' } }
      const req = mockReq(request)
      const res = mockRes()
      await account.receiveNewAccount(req, res)
      expect(res.status.lastCall.lastArg).equal(200)
    })
    it('should result 500, second email use', async () => {
      const request = { body: { email: 'niceemail@email.de', password: 'newPassword' } }
      const req = mockReq(request)
      const res = mockRes()
      await account.receiveNewAccount(req, res)
      expect(res.status.lastCall.lastArg).equal(500)
    })
  })
})

