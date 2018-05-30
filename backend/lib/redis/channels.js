const Channel = require('./channel')

const channelPrefix = {
  lunchspace: 'lunchspace',
  location: 'location',
  joinUpAt: 'joinUpAt'
}

function lunchspaceChannel(lunchspaceId) {
  return new Channel([channelPrefix.lunchspace, lunchspaceId])
}

function locationChannel(lunchspaceId, locationId) {
  return lunchspaceChannel(lunchspaceId).concat([channelPrefix.location, locationId])
}

function joinUpAt(lunchspaceId, locationId, timeId) {
  return locationChannel(lunchspaceId, locationId, timeId).concat(channelPrefix.joinUpAt, timeId)
}

module.exports = {
  lunchspaceChannel,
  locationChannel,
}
