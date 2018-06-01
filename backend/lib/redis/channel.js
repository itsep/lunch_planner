
const containsPatternRegex = /(^|[^\\])(\*|\?|(\[\w+\]))/

/**
 * A Type that supports converting to an Channel
 * @typedef {Channel|Array<string>|string} ChannelConvertible
 */
class Channel {
  /**
   * @param {string} channel
   * @returns {boolean}
   */
  static containsPattern(channel) {
    return containsPatternRegex.test(channel)
  }
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
    if (typeof channelConvertible === 'string' || typeof channelConvertible === 'number') {
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
    channelSlices.forEach((channelSlice) => {
      const slice = typeof channelSlice === 'string' ? channelSlice : channelSlice.toString()
      if (slice.toString().length === 0) {
        throw new TypeError('all channelSlices must contain at least one character')
      }
    })
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

  /**
   * @returns {boolean}
   */
  containsPattern() {
    return Channel.containsPattern(this.toString())
  }
}

/**
 * Default channel slices delimiter
 * @type {string}
 */
Channel.defaultDelimiter = '.'

module.exports = Channel
