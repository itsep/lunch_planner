const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

async function createToken(userId) {
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '72h' }
  )
  return token
}

module.exports = {
  createToken,
}
