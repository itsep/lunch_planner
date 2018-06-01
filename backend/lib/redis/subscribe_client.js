const Channel = require('./channel')

/**
 * @callback SubscriberCallback
 * @param {Object} message
 */

/**
 * call this function to unsubscribe the callback
 * @callback UnsubscribeCallback
 */


class SubscribeClient {
  constructor(client) {
    this.client = client
    this.channelToSubscriberMap = {}
    this.client.on('message', this.onMessage.bind(this))
    this.client.on('pmessage', this.onMessageFromPattern.bind(this))
  }

  /**
   *
   * @param {ChannelConvertible} channelConvertible
   * @param {SubscriberCallback} callback
   * @returns {UnsubscribeCallback}
   */
  subscribe(channelConvertible, callback) {
    const channel = Channel.from(channelConvertible).toString()
    this.channelToSubscriberMap[channel] = this.channelToSubscriberMap[channel] || []
    this.channelToSubscriberMap[channel].push(callback)

    if (this.channelToSubscriberMap[channel].length === 1) {
      this.globalSubscribe(channel)
    }

    return this.makeUnsubscribe(channel, callback)
  }

  /**
   * create a function which can remove the given callback from the channelToSubscriberMap
   * @private
   * @param {string} channel
   * @param {SubscriberCallback} callback
   * @returns {UnsubscribeCallback}
   */
  makeUnsubscribe(channel, callback) {
    let unsubscribed = false
    return () => {
      // already unsubscribed
      if (unsubscribed) {
        return
      }
      unsubscribed = true
      this.unsubscribe(channel, callback)
    }
  }

  /**
   * @private
   * @param {ChannelConvertible} channelConvertible
   * @param callback
   */
  unsubscribe(channelConvertible, callback) {
    const channel = Channel.from(channelConvertible).toString()
    const subscriber = this.channelToSubscriberMap[channel]
    // no channelToSubscriberMap
    if (!subscriber) {
      return
    }
    const callbackIndex = subscriber.indexOf(callback)
    // callback already unsubscribed
    if (callbackIndex === -1) {
      return
    }
    subscriber.splice(callbackIndex, 1)
    if (subscriber.length === 0) {
      this.globalUnsubscribe(channel)
    }
  }
  /**
   * @private
   * @param {string} channel
   */
  globalSubscribe(channel) {
    if (Channel.containsPattern(channel)) {
      this.client.psubscribe(channel)
    } else {
      this.client.subscribe(channel)
    }
  }
  /**
   * @private
   * @param {string} channel
   */
  globalUnsubscribe(channel) {
    if (Channel.containsPattern(channel)) {
      this.client.punsubscribe(channel)
    } else {
      this.client.unsubscribe(channel)
    }
  }
  /**
   * called from redis client for every message from a subsribe
   * @param {string} channel
   * @param {string} message
   */
  onMessage(channel, message) {
    this.notifySubscriber(channel, message)
  }
  /**
   * called from redis client for every message from a psubsribe
   * @param {string} pattern
   * @param {string} channel
   * @param {string} message
   */
  onMessageFromPattern(pattern, channel, message) {
    this.notifySubscriber(pattern, message)
  }
  /**
   * notifies all subscribers on a given channel
   * @private
   * @param {string} channel
   * @param {string} message
   */
  notifySubscriber(channel, message) {
    const messageObject = JSON.parse(message)
    const subscriber = this.channelToSubscriberMap[channel] || []
    subscriber.forEach((callback) => {
      callback(messageObject)
    })
  }
}

module.exports = SubscribeClient
