const config = require('config')

const host = config.get('host')

function getInviteToLunchspaceLink(token) {
  return `${host}/join_lunchspace.html?token=${encodeURIComponent(token)}`
}

module.exports = {
  getInviteToLunchspaceLink,
}
