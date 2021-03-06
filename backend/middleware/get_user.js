const { asyncExpressMiddleware } = require('../lib/async_middleware')
const { AuthenticationError } = require('../../shared/lib/error')
const { pool } = require('../lib/database')

async function asyncGetUser(req) {
  if (!req.token) {
    throw new AuthenticationError('No token in request. The authentication middleware must be before the getUser middleware.')
  }
  const { userId } = req.token
  req.userPromise = pool.execute(`SELECT user.id, first_name as firstName, last_name as lastName, image_url as imageUrl, email, language 
FROM user
LEFT JOIN account ON account.user_id = user.id
WHERE user.id = ?`, [userId])
    .then(([result]) => {
      if (result.length === 0) {
        throw new AuthenticationError('User id in token does not match with any user found in the database.')
      }
      const [user] = result
      return user
    })
}

module.exports = {
  asyncGetUser,
  getUser: asyncExpressMiddleware(asyncGetUser),
}
