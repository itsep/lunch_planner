const { asyncMiddleware } = require('../lib/asyncMiddleware')
const { AuthenticationError } = require('../lib/error')
const { pool } = require('../lib/database')

async function asyncGetUser(req) {
  if (!req.token) {
    throw new AuthenticationError('No token in request. The authentication middleware must be before the getUser middleware.')
  }
  const { userId } = req.token
  req.userPromise = pool.execute(`SELECT user.id, first_name as firstName, last_name as lastName, image_url as imageUrl, email 
FROM user
LEFT JOIN account ON account.user_id = user.id
WHERE user.id = ?`, [userId])
    .then(([result]) => {
      if (result.length === 0) {
        throw new AuthenticationError('Could not find a user in the database for user id found in token.')
      }
      return result[0]
    })
}

module.exports = {
  asyncGetUser,
  getUser: asyncMiddleware(asyncGetUser),
}
