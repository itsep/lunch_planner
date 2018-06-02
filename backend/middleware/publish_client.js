const redis = require('redis')
const PublishClient = require('../lib/redis/publish_client')

function createPublishClientMiddleware() {
  const redisClient = redis.createClient()
  const publishClient = new PublishClient(redisClient)
  return (req, res, next) => {
    req.publishClient = publishClient
    next()
  }
}

module.exports = {
  createPublishClientMiddleware,
}
