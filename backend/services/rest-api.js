require('dotenv').load()
require('../../shared/lib/promise_polyfill')
const express = require('express')
const cookieParser = require('cookie-parser')
const { createPublishClientMiddleware } = require('../middleware/publish_client')
const { convertRawSQLErrorToLocalizableSQLError, handleError } = require('../middleware/error_handler')

const app = express()

app.use('/images', express.static('images'))
app.use(cookieParser())
app.use(createPublishClientMiddleware())
// eslint-disable-next-line import/newline-after-import
app.use('/account', require('../routes/account/index').router)
// eslint-disable-next-line import/newline-after-import
app.use('/lunchspace', require('../routes/lunchspace/index').router)
// eslint-disable-next-line import/newline-after-import
app.use('/location', require('../routes/location/index').router)
// eslint-disable-next-line import/newline-after-import
app.use('/event', require('../routes/event/index').router)
// eslint-disable-next-line import/newline-after-import
app.use('/notification', require('../routes/notification/index').router)

app.use(convertRawSQLErrorToLocalizableSQLError)
app.use(handleError)

app.listen(9100)
