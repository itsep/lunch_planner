const { pool } = require('../lib/database')
const jwt = require('jsonwebtoken')
require('dotenv').load()
const { hash, compare } = require('../lib/password_hash')

async function getHashedPasswordWithEmail(email) {
  const conn = await pool.getConnection()
  const [result] = await conn.execute('SELECT account_hashed_password as accountHashedPassword FROM account WHERE account_email = ?', [email])
  conn.release()
  if (result.length > 0) {
    const { accountHashedPassword } = result[0]
    return accountHashedPassword
  }
  return undefined
}

async function create(email, password) {
  const hashedPassword = await hash(password)
  const conn = await pool.getConnection()
  try {
    await conn.execute('INSERT INTO account (account_email, account_hashed_password) ' +
      'VALUES (?,?)', [email, hashedPassword])
    return false
  } catch (error) {
    return error
  } finally {
    conn.release()
  }
}

async function login(email, password) {
  const hashedPassword = await getHashedPasswordWithEmail(email)
  if (compare(password, hashedPassword)) {
    return jwt.sign(
      { auth: email },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    )
  }
  return false
}

module.exports = { create, login, getHashedPasswordWithEmail }
