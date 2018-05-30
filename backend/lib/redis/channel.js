/**
 * A Type that supports converting to an Channel
 * @typedef {Channel|Array<string>|string} ChannelConvertible
 */
class Channel {
  /**
   * converts a given `channelConvertible` to an `Channel`
   * @param {ChannelConvertible} channelConvertible
   * @returns {Channel}
   */
  static from(channelConvertible) {
    if (channelConvertible instanceof Channel) {
      return channelConvertible
    }
    if (Array.isArray(channelConvertible)) {
      return new Channel(channelConvertible)
    }
    if (typeof channelConvertible === 'string') {
      return new Channel([channelConvertible])
    }
    throw new TypeError('object must be of an Array, a String or an instance of Channel')
  }

  /**
   *
   * @param {Array<string>} channelSlices
   */
  constructor(channelSlices) {
    if (!Array.isArray(channelSlices)) {
      throw new TypeError('channelSlices must be an Array')
    }
    if (channelSlices.length === 0) {
      throw new TypeError('channelSlices must contain at least one slice')
    }
    /**
     * An Array of channel slices
     * @type {Array<string>}
     */
    this.channelSlices = channelSlices
  }

  /**
   * joins all channelSlices with the given `delimiter`
   * @param {string} delimiter
   * @returns {string}
   */
  toString(delimiter = Channel.defaultDelimiter) {
    return this.channelSlices.join(delimiter)
  }

  /**
   * Concat the channelSlices of `this` and `otherChannelConvertible`
   * @param {ChannelConvertible} otherChannelConvertible
   * @returns {Channel} new Channel containing all channelSlices
   */
  concat(otherChannelConvertible) {
    const otherChannel = Channel.from(otherChannelConvertible)
    return new Channel(this.channelSlices.concat(otherChannel.channelSlices))
  }
}

/**
 * Default channel slices delimiter
 * @type {string}
 */
Channel.defaultDelimiter = '.'

module.exports = Channel
