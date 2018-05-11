require('dotenv').load()
require('../shared/lib/promise_polyfill')
const express = require('express')
const cookieParser = require('cookie-parser')
const { convertRawSQLErrorToLocalizableSQLError, handleError } = require('./middleware/error_handler')

const app = express()

app.use(cookieParser())
// eslint-disable-next-line import/newline-after-import
app.use('/account', require('./routes/account').router)
// eslint-disable-next-line import/newline-after-import
app.use('/lunchspace', require('./routes/lunchspace').router)

app.use(convertRawSQLErrorToLocalizableSQLError)
app.use(handleError)

app.listen(8081)
