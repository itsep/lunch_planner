const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const { pool } = require('../lib/database')

const accountRouter = Router()

async function accountCount(req, res) {
  const conn = await pool.getConnection()
  const result = await conn.execute('SELECT COUNT(*) as count FROM account')
  res.json({
    count: result[0][0].count,
  })
}

accountRouter.get('/count', asyncHandler(accountCount))

module.exports = {
  router: accountRouter,
  count: accountCount,
}
