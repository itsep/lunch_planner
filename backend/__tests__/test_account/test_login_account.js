const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { pool } = require('../../lib/database')
const { hash, compare } = require('../../lib/password_hash')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { getIdAndHashedPassword, login, authenticate } = require('../../routes/account/login_account')
const { InputValidationError } = require('../../../shared/lib/error/index')

const testEmail = 'test-login@email.com'
const testPassword = 'test-login-password'


describe('test login account', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const testHashedPassword = await hash(testPassword)
    const user = [testEmail, testHashedPassword]
    await pool.execute('INSERT INTO account (email, hashed_password) VALUES (?, ?)', user)
  })
  describe('get hashed password and id', () => {
    it('should return the right hashed password', async () => {
      const { hashedPassword } = await getIdAndHashedPassword(testEmail)
      expect(await compare(testPassword, hashedPassword)).toEqual(true)
    })
    it('should result undefined', async () => {
      const result = await getIdAndHashedPassword('no real email')
      expect(result).toEqual(undefined)
    })
  })
  describe('authenticateRequest', () => {
    it('should return a jwt', async () => {
      const { token } = await authenticate(testEmail, testPassword)
      expect(token).not.toEqual(false)
    })
    it('should return decoded token', async () => {
      const { token } = await authenticate(testEmail, testPassword)
      expect(token).not.toEqual(undefined)
    })
  })
  describe('account login', () => {
    it('should set a cookie', async () => {
      const request = { body: { email: testEmail, password: testPassword } }
      const req = mockReq(request)
      const res = mockRes()
      await login(req, res)
      expect(res.cookie.mock.calls[0][0]).toEqual('lunch_planner_token')
    })
    it('shouldn`t set a cookie', async () => {
      const request = { body: { email: 'no email', password: 'no password' } }
      const req = mockReq(request)
      const res = mockRes()
      await expect(login(req, res)).rejects.toThrowError(InputValidationError)
    })
  })
})
