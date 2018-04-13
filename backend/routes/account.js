const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const { pool } = require('../lib/database')
const accountHandler = require('../lib/handle_accounts')

const accountRouter = Router()
accountRouter.use(bodyParser.json())

async function accountCount(req, res) {
  const conn = await pool.getConnection()
  const query = conn.execute('SELECT COUNT(*) as count FROM account')
  conn.release()
  const [result] = await query
  const { count } = result[0]
  res.set({ 'content-type': 'application/json;charset=utf-8' })
  res.json({
    count,
  })
}

async function receiveNewAccount(req, res) {
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 13)
  const error = await accountHandler.createAccount(email, hashedPassword)
  res.status(200)
  if (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(500).json({ error: 'Email is already registered.' })
    } else throw error
  }
}

accountRouter.get('/count', asyncHandler(accountCount))

accountRouter.post('/', asyncHandler(receiveNewAccount))

module.exports = {
  router: accountRouter,
  count: accountCount,
  receiveNewAccount,
}
