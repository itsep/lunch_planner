const { Router } = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
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
  res.json({
    count,
  })
}

async function receiveNewAccount(req, res) {
  const { email, password } = req.body
  const error = await accountHandler.create(email, password)
  if (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(500).json({ error: 'Email is already registered.' })
    } else throw error
  } else {
    res.status(200)
  }
}

async function accountAuthenticate(req, res) {
  const { email, password } = req.body
  const token = await accountHandler.login(email, password)
  if (token) {
    res.json({
      token,
    })
  } else {
    res.status(401).json({ error: `Password does not match with email: ${email}` })
  }
}

accountRouter.get('/count', asyncHandler(accountCount))

accountRouter.post('/', asyncHandler(receiveNewAccount))

accountRouter.post('/login', asyncHandler(accountAuthenticate))

module.exports = {
  router: accountRouter,
  count: accountCount,
  receiveNewAccount,
  accountAuthenticate,
}
