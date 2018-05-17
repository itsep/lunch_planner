function asyncMiddleware(middleware) {
  return (req, res, next) => {
    middleware(req, res).then(next, next)
  }
}

module.exports = {
  asyncMiddleware,
}
