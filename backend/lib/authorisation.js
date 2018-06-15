function isAuthorised(token) {
  return token && token.userId && token.sessionId
}

module.exports = {
  isAuthorised,
}
