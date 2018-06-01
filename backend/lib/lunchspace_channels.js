const Channel = require('./redis/channel')

const channelSuffix = {
  lunchspace: 'lunchspace',
  location: 'location',
  joinUpAt: 'joinUpAt',
}

/**
 * @param {String|Number} lunchspaceId
 * @returns {Channel}
 */
function lunchspaceChannel(lunchspaceId) {
  return new Channel([lunchspaceId, channelSuffix.lunchspace])
}

/**
 * @param {String|Number} lunchspaceId
 * @param {String|Number} locationId
 * @returns {Channel}
 */
function locationChannel(lunchspaceId, locationId) {
  return lunchspaceChannel(lunchspaceId).concat([locationId, channelSuffix.location])
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
  return locationChannel(lunchspaceId, locationId).concat([dateId, timeId, channelSuffix.joinUpAt])
}

module.exports = {
  lunchspaceChannel,
  locationChannel,
  joinUpAt,
}
