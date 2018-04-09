const express = require('express')
const fs = require('fs')

const app = express()
const indexModules = require('./index_modules/index_modules')
const { createMultiStatementConnection } = require('./lib/database')

const sqlInit = fs.readFileSync('../database/schema.sql').toString()

// eslint-disable-next-line import/newline-after-import
app.use('/account', require('./routes/account').router)
app.get('/*', indexModules.getSlashAll)


app.listen(8081, indexModules.listen8080)

createMultiStatementConnection().then((conn) => {
  conn.query(sqlInit, null, (err2) => {
    if (err2) {
      console.error(err2)
    }
  })
})

/*
mariadb.dbPool.getConnection((err, connection) => {
  if (err) { console.error(400); return }
  connection.query('SELECT * FROM account', null, (err2, rows) => {
    if (err2) {
      connection.release()
      console.error(400, err2)
      return
    }
    console.log(rows)
    connection.release()
  })
})
*/
