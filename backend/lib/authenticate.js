const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

async function stringifyToken(userId) {
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '72h' }
  )
  return token
}

function parseToken(token) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return undefined
  }
}

module.exports = {
  stringifyToken,
  parseToken,
}
