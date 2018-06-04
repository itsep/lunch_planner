function logout(req, res) {
  res.clearCookie('lunch_planner_token')
  res.json({})
}

module.exports = {
  logout,
}
