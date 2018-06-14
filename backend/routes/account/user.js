async function user(req, res) {
  res.json({
    user: await req.userPromise,
  })
}

module.exports = {
  user,
}