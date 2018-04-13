const handleAccounts = require('../lib/handle_accounts')
const { compare } = require('../lib/password_hash')

describe('handle accounts', () => {
  const testEmail = 'test@email.com'
  const testPassword = 'testpassword'
  describe('create', () => {
    it('should create a new account in DB, without error', async () => {
      const error = await handleAccounts.create(testEmail, testPassword)
      expect(error).equal(false)
    })
    it('should throw an error, email is already used', async () => {
      const error = await handleAccounts.create(testEmail, testPassword)
      expect(error.code).equal('ER_DUP_ENTRY')
    })
  })
  describe('get hashed password with email', () => {
    it('should return the right hashed password', async () => {
      const hashedPassword = await handleAccounts.getHashedPasswordWithEmail(testEmail)
      expect(await compare(testPassword, hashedPassword)).equal(true)
    })
    it('should result undefined', async () => {
      const result = await handleAccounts.getHashedPasswordWithEmail('no real email')
      expect(result).to.equal(undefined)
    })
  })
  describe('login', () => {
    it('should return a jwt', async () => {
      const token = await handleAccounts.login(testEmail, testPassword)
      expect(token).to.not.equal(false)
    })
  })
})
