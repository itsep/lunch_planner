const mariadb = require('./database_driver/mariadb_driver');

mariadb.getConnection((err, conn) => {
  if (err) { console.error(400); return; }
  conn.query('SELECT * FROM account', null, (err2, rows) => {
    if (err2) {
      conn.release();
      console.error(400);
      return;
    }
    console.log(rows);
    conn.release();
  });
});

