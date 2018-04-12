const { pool } = require('../lib/database')

async function createAccount(email, hashedPassword) {
  const conn = await pool.getConnection()
  try {
    await conn.execute('INSERT INTO account (account_email, account_hashed_password) ' +
      'VALUES (?,?)', [email, hashedPassword])
  } catch (error) {
    return error
  } finally {
    conn.release()
  }
}

module.exports = { createAccount }
