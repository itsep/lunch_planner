require('dotenv').load()
const mysql = require('mysql')

if (!process.env.USERNAME || !process.env.PASSWORD) {
  console.error('No database username or no database password given.')
} else {
  module.exports = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABSE_USERNAME,
    password: process.env.DATABSE_PASSWORD,
    database: 'lunch_planner',
  })
}

/*
    USE:
const mariadb = require('./database_driver/mariadb_driver')
mariadb.getConnection((err, conn) => {
  if (err) { console.error(400); return }
  conn.query('SELECT * FROM account', null, (err2, rows) => {
    if (err2) {
      conn.release()
      console.error(400)
      return
    }
    console.log(rows)
    conn.release()
  })
})
*/
