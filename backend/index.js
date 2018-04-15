const express = require('express')

const app = express()

// eslint-disable-next-line import/newline-after-import
app.use('/account', require('./routes/account').router)

app.listen(8081)
