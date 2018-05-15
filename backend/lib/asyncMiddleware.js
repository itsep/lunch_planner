function asyncMiddleware(middleware) {
  return (req, res, next) => {
    middleware(req, res).then(next).catch(next)
  }
}

module.exports = {
  asyncMiddleware,
}
