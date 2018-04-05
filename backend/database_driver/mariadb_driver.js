const mysql = require('mysql');

// User und passwort in extra Datei

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'sebi',
  password: 'sebi',
  database: 'lunch_planner',
});

