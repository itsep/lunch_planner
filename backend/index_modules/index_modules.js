function getSlashAll(req, res) {
  res.send('Hello World!')
}

function listen8080() {
  console.log('App is listening on 8080')
}

module.exports = {
  getSlashAll,
  listen8080,
}
