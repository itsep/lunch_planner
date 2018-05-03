require('./lib/promise_polyfill')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
// eslint-disable-next-line import/newline-after-import
app.use('/account', require('./routes/account').router)

app.listen(8081)
