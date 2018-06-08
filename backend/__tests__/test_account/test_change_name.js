const { create } = require('../../routes/account/register_account')
const { changeName } = require('../../routes/account/change_name')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { isName } = require('../../lib/supportive_functions')
const { InputValidationError } = require('../../../shared/lib/error')

let testUserId
const email = 'max.mustermann@gmail.com'
const password = 'password'
const firstName = 'Jack'
const lastName = 'Napier'
const newFirstName1 = 'Oswald'
const newLastName1 = 'Cobblepott'
const newFirstName2 = '           '
const newLastName2 = 15


describe('change_name', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await create(email, password, firstName, lastName)
    testUserId = userId
  })
  describe('changeName', () => {
    it('should change name', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        body: {
          firstName: newFirstName1,
          lastName: newLastName1,
        },
      })
      const res = mockRes()
      await changeName(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(isName(testUserId, newFirstName1, newLastName1))
    })
    it('should change name, to same name', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        body: {
          firstName: newFirstName1,
          lastName: newLastName1,
        },
      })
      const res = mockRes()
      await changeName(req, res)
      expect(res.status).lastCalledWith(200)
      await expect(isName(testUserId, newFirstName1, newLastName1))
    })
    it('should throw an error, illegalLength', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        body: {
          firstName: newFirstName2,
          lastName: newLastName1,
        },
      })
      const res = mockRes()
      await expect(changeName(req, res)).rejects.toThrowError(InputValidationError)
      await expect(isName(testUserId, newFirstName1, newLastName1))
    })
    it('should throw an error, not a string', async () => {
      const req = mockReq({
        token: {
          userId: testUserId,
        },
        body: {
          firstName: newFirstName1,
          lastName: newLastName2,
        },
      })
      const res = mockRes()
      await expect(changeName(req, res)).rejects.toThrowError(InputValidationError)
      await expect(isName(testUserId, newFirstName1, newLastName1))
    })
  })
})
