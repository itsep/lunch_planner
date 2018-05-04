const { createLunchspace, create, connect } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database_mock')

const testUrl = 'vsf-experts-mannheim'
const testLunchspaceName = 'vsf-experts Mannheim'

describe('create lunchspace', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  describe('create lunchspace', async () => {
    it('should create a new lunchspace in DB, without throwing an error', async () => {
      await expect(create(testLunchspaceName, testUrl)).resolves.not.toThrow()
    })
    it('should throw an error', async () => {
      await expect(create(testLunchspaceName, testUrl)).rejects.toHaveProperty('code', 'ER_DUP_ENTRY')
    })
  })
})