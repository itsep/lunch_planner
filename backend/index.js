const express = require('express')

const app = express()
const indexModules = require('./index_modules/index_modules')

// eslint-disable-next-line import/newline-after-import
app.use('/account', require('./routes/account').router)
app.get('/', indexModules.getSlashAll)


app.listen(8081, indexModules.listen8080)
