const Channel = require('./redis/channel')

const channelPrefix = {
  lunchspace: 'lunchspace',
  location: 'location',
  joinUpAt: 'joinUpAt',
}

function lunchspaceChannel(lunchspaceId) {
  return new Channel([channelPrefix.lunchspace, lunchspaceId])
}

function locationChannel(lunchspaceId, locationId) {
  return lunchspaceChannel(lunchspaceId).concat([channelPrefix.location, locationId])
}

function joinUpAt(lunchspaceId, locationId, dateId, timeId) {
  return locationChannel(lunchspaceId, locationId).concat([channelPrefix.joinUpAt, dateId, timeId])
}

module.exports = {
  lunchspaceChannel,
  locationChannel,
  joinUpAt,
}
