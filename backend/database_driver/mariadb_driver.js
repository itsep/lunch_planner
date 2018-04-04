const mysql = require('mysql');

//User und passwort in extra Datei

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lunch_planner'
})

exports.connection = {
    query: ()=> {
        var queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {}

        pool.getConnection((err, conn)=> {
            if (err) {
                if (eventNameIndex.error) {
                    eventNameIndex.error()
                }
            }
            if (conn) {
                var q = conn.query.apply(conn, queryArgs)
                q.on('end',()=> {
                    conn.release()
                });

                events.forEach((args)=> {
                    q.on.apply(q, args)
                });
            }
        });

        return {
            on: (eventName, callback)=> {
                events.push(Array.prototype.slice.call(arguments))
                eventNameIndex[eventName] = callback
                return this
            }
        }
    }
}
