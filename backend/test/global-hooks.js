const { pool } = require('../lib/database')

// before(() => {
//   pool.changeDatabase('does_not_exists')
// })

after(async () => {
  pool.end()
})
