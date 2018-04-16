const { mockReq, mockRes } = require('../../lib/express_mock')
const { logout } = require('../../routes/account/logout_account')

describe('account login', () => {
  it('should reset a cookie', async () => {
    const req = mockReq()
    const res = mockRes()
    await logout(req, res)
    // eslint-disable-next-line no-unused-expressions
    expect(res.clearCookie).to.be.calledOnce
  })
})
