function asyncExpressMiddleware(middleware) {
  return (req, res, next) => {
    middleware(req, res).then(next, next)
  }
}
function asyncSocketMiddleware(middleware) {
  return (socket, next) => {
    middleware(socket).then(next, next)
  }
}

module.exports = {
  asyncExpressMiddleware,
  asyncSocketMiddleware,
}
