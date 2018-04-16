const { accountCount } = require('../../routes/middleware/count_account')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')

describe('count account', () => {
  it('should return 0', async () => {
    const req = mockReq()
    const res = mockRes()
    await accountCount(req, res)
    expect(res.json).to.be.calledWith({ count: 0 })
  })
  it('should return 1 after insertion', async () => {
    const user = ['dnadoba@gmail.com', 'awesome hashed password']
    await pool.execute('INSERT INTO account (account_email, account_hashed_password) VALUES (?, ?)', user)
    const req = mockReq()
    const res = mockRes()
    await accountCount(req, res)
    expect(res.json).to.be.calledWith({ count: 1 })
  })
})