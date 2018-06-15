const { create } = require('../../routes/account/register_account')
const { InputValidationError } = require('../../../shared/lib/error')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { changePassword, updatePassword } = require('../../routes/account/change_password')
const { authenticate } = require('../../routes/account/login_account')

let testUserId
const email = 'max.mustermann@gmail.com'
const wrongEmail = 'noreply.lunchspace@gmail.com'
const password = 'password'
const firstName = 'Jack'
const lastName = 'Napier'
const testLanguage = 'de'
const newPassword = 'newPassword'

describe('change_password', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await create(email, password, firstName, lastName, testLanguage)
    testUserId = userId
  })
  describe('updatePassword', () => {
    it('should update password to new password', async () => {
      await updatePassword(testUserId, newPassword)
      await expect(authenticate(email, newPassword)).resolves.not.toEqual(false)
      await expect(authenticate(email, password)).resolves.toEqual(false)
    })
    it('should update new password to new password', async () => {
      await updatePassword(testUserId, newPassword)
      await expect(authenticate(email, newPassword)).resolves.not.toEqual(false)
      await expect(authenticate(email, password)).resolves.toEqual(false)
    })
  })
  describe('changePassword', () => {
    it('should throw an error, because of using old password', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        userPromise: {
          email,
        },
        body: {
          password,
          newPassword,
        },
      })
      const res = mockRes()
      await expect(changePassword(req, res)).rejects.toThrowError(InputValidationError)
      await expect(authenticate(email, newPassword)).resolves.not.toEqual(false)
      await expect(authenticate(email, password)).resolves.toEqual(false)
    })
    it('should throw an error, because of using wrong email', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        userPromise: {
          email: wrongEmail,
        },
        body: {
          password,
          newPassword,
        },
      })
      const res = mockRes()
      await expect(changePassword(req, res)).rejects.toThrowError(InputValidationError)
      await expect(authenticate(email, newPassword)).resolves.not.toEqual(false)
      await expect(authenticate(email, password)).resolves.toEqual(false)
    })
    it('should change password back to password', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        userPromise: {
          email,
        },
        body: {
          password: newPassword,
          newPassword: password,
        },
      })
      const res = mockRes()
      await changePassword(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(authenticate(email, password)).resolves.not.toEqual(false)
      await expect(authenticate(email, newPassword)).resolves.toEqual(false)
    })
  })
})
