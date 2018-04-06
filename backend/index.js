const express = require('express')
const fs = require('fs')

const app = express()
const indexModules = require('./index_modules/index_modules')
const mariadb = require('./database_driver/mariadb_driver')

const sqlInit = fs.readFileSync('../database/schema.sql').toString()

app.get('/*', indexModules.getSlashAll)

app.listen(8080, indexModules.listen8080)


mariadb.createMultiStatementConnection().query(sqlInit, null, (err2) => {
  if (err2) {
    console.error(err2)
  }
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
