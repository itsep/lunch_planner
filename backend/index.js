const mariadb = require('./database_driver/mariadb_driver')

mariadb.getConnection((err, conn)=> {
    if (err)
        return console.error(400)
    conn.query('SELECT * FROM account', null, (err, rows)=> {
        if(err) {
            conn.release();
            return console.error(400)
        }
        console.log(rows)
        conn.release()
    })
})


