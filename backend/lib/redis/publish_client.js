const Channel = require('./channel')

class PublishClient {
  constructor(client) {
    this.client = client
  }

  /**
   * publish a given `messageObject` on the given `channelConvertible`
   * @param {ChannelConvertible} channelConvertible
   * @param {Object} messageObject
   */
  publish(channelConvertible, messageObject) {
    const channel = Channel.from(channelConvertible)
    const message = JSON.stringify(messageObject)
    this.client.publish(channel.toString(), message)
  }
}

module.exports = PublishClient
