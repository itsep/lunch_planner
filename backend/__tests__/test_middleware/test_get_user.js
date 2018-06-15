const { create } = require('../../routes/account/register_account')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { asyncGetUser } = require('../../middleware/get_user')

describe('verify account', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  const email = 'dnadoba@gmail.com'
  const firstName = 'David'
  const lastName = 'Nadoba'
  const language = 'de'
  let userId
  beforeAll(async () => {
    // Create account
    const result = await create(email, 'random password', firstName, lastName, language)
    // eslint-disable-next-line prefer-destructuring
    userId = result.userId
  })
  it('should throw an error if no token is defined', async () => {
    const req = mockReq()
    const res = mockRes()
    await expect(asyncGetUser(req, res)).rejects.toThrow()
  })
  it('should create a promise and the promise shoudl resovles to the user', async () => {
    const req = mockReq({ token: { userId } })
    const res = mockRes()
    await asyncGetUser(req, res)
    await expect(req.userPromise).resolves.toMatchObject({
      id: userId,
      firstName,
      lastName,
    })
  })
  it('should create a promise and the promise shoudl resovles to the user', async () => {
    const req = mockReq({ token: { userId: -1 } })
    const res = mockRes()
    await asyncGetUser(req, res)
    await expect(req.userPromise).rejects.toThrow()
  })
})
