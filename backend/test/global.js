const { pool } = require('../lib/database')

before(() => {

})

after(async () => {
  pool.end()
})
