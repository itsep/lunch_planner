const mysql = require('mysql')

//To be changed, als pool

const pool = mysql.createPool({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
})

const connection = pool.getConnection( err => {
    if(err){
        //Fehlermeldun, dass nicht connected wurde
    }
})

connection.query()
//use connection with: connection.query('SQL anweisung')
//After usage connection.release()
//end pool: pool.end()