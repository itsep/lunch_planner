function logout(req, res) {
  res.clearCookie('lunch_planner_token')
  res.end()
}

module.exports = {
  logout,
}
