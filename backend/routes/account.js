const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const { pool } = require('../lib/database')

const accountRouter = Router()

async function accountCount(req, res) {
  const conn = await pool.getConnection()
  const query = conn.execute('SELECT COUNT(*) as count FROM account')
  conn.release()
  const result = await query
  res.json({
    count: result[0][0].count,
  })
}

accountRouter.get('/count', asyncHandler(accountCount))

module.exports = {
  router: accountRouter,
  count: accountCount,
}

async function accountInsert(req, rest) {
  const conn = await pool.getConnection()
  const query = conn.execute(
    'INSERT INTO account (account_email, account_name, account_hashed_password) VALUE (?,?,?)',
    [
      ["dnadoba@gmail.com", "David Nadoba", "Super password"],
    ]
  )
  conn.release()
  const result = await query
}
