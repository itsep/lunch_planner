const Channel = require('./redis/channel')

const channelPrefix = {
  lunchspace: 'lunchspace',
  location: 'location',
  joinUpAt: 'joinUpAt',
}

/**
 * @param {String|Number} lunchspaceId
 * @returns {Channel}
 */
function lunchspaceChannel(lunchspaceId) {
  return new Channel([channelPrefix.lunchspace, lunchspaceId])
}

/**
 * @param {String|Number} lunchspaceId
 * @param {String|Number} locationId
 * @returns {Channel}
 */
function locationChannel(lunchspaceId, locationId) {
  return lunchspaceChannel(lunchspaceId).concat([channelPrefix.location, locationId])
}

/**
 *
 * @param {String|Number} lunchspaceId
 * @param {String|Number} locationId
 * @param {String} dateId
 * @param {String} timeId
 * @returns {Channel}
 */
function joinUpAt(lunchspaceId, locationId, dateId, timeId) {
  return locationChannel(lunchspaceId, locationId).concat([channelPrefix.joinUpAt, dateId, timeId])
}

module.exports = {
  lunchspaceChannel,
  locationChannel,
  joinUpAt,
}
