const { createLocation, create } = require('../../routes/location/create_location')
const { createLunchspaceAndJoin } = require('../../routes/lunchspace/create_lunchspace')
const account = require('../../routes/account/register_account')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')
const { mockReq, mockRes } = require('../../lib/express_mock')
const { pool } = require('../../lib/database')
const { InputValidationError } = require('../../../shared/lib/error')

const testEmail = 'noreply.lunchspace@gmail.com'
const testPassword = 'password'
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testLanguage = 'de'

const testEmail2 = 'reply.lunchspace@gmail.com'
const testPassword2 = 'password'
const testFirstName2 = 'Maxfrau'
const testLastName2 = 'Musterfrau'

const testName = 'McBurger'
const testName2 = ''
const testCoordinates = { lat: 20, long: 10 }
const testCoordinates2 = 'test'
const testLunchspaceId = 1

describe('create location', () => {
  beforeAll(createMockDatabase, 1000 * 60 * 10)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    const { userId } = await account.create(testEmail, testPassword, testFirstName, testLastName, testLanguage)

    const req = mockReq({
      body: { lunchspaceName: 'Test Space', lunchspaceSubdomain: 'test-space' },
      token: { userId },
    })
    const res = mockRes()
    await account.create(testEmail2, testPassword2, testFirstName2, testLastName2, testLanguage)

    await createLunchspaceAndJoin(req, res)
  })
  describe('create', async () => {
    it('should create a location in DB', async () => {
      await expect(create(testName, testCoordinates, testLunchspaceId))
        .resolves.toEqual(expect.any(Number))
    })
  })
  describe('createLocation', async () => {
    it('should create a new location in DB', async () => {
      const req = mockReq({
        body: { name: testName, coordinates: testCoordinates },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      await createLocation(req, res)
      expect(res.status).lastCalledWith(200)
    })
    it('should fail (name too short)', async () => {
      const req = mockReq({
        body: { name: testName2, coordinates: testCoordinates },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      const createLocationPromise = createLocation(req, res)
      await expect(createLocationPromise).rejects.toThrowError(InputValidationError)
      await expect(createLocationPromise).rejects.toHaveProperty('property', 'name')
    })
    it('should fail (illegal coordinates)', async () => {
      const req = mockReq({
        body: { name: testName, coordinates: testCoordinates2 },
        lunchspace: { id: testLunchspaceId },
      })
      const res = mockRes()
      const createLocationPromise = createLocation(req, res)
      await expect(createLocationPromise).rejects.toThrowError(InputValidationError)
      await expect(createLocationPromise).rejects.toHaveProperty('property', 'coordinates')
    })
  })
})
