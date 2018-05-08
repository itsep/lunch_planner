function isAuthorised(token) {
  return token && token.userId
}

module.exports = {
  isAuthorised,
}
