const mariadb = require('./database_driver/mariadb_driver')

mariadb.acquireConnection()

mariadb.releaseConnection()