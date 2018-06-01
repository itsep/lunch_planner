const redisMock = require('redis-mock')
const SubscribeClient = require('./subscribe_client')

function makeSubscribeClientMock() {
  const pubClient = redisMock.createClient()
  const subClient = redisMock.createClient()
  const subscriber = new SubscribeClient(subClient)
  const release = () => {
    pubClient.end()
    subClient.end()
  }
  return {
    pubClient, subClient, subscriber, release,
  }
}

describe('SubscribeClient', () => {
  it('check that `subscribe` listens on the correct channel', (done) => {
    const expectedChannel = 'test'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    subscriber.subscribe(expectedChannel, (message) => {
      expect(message).toEqual(expectedMessage)
      release()
      done()
    })
    pubClient.publish(expectedChannel, JSON.stringify(expectedMessage))
  })
  it('check that `subscribe` listens on the correct channel and calls all listener', (done) => {
    const expectedChannel = 'test'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    let callCount = 0
    const mockCallback = (message) => {
      callCount += 1
      expect(message).toEqual(expectedMessage)
      if (callCount === 3) {
        release()
        done()
      }
    }
    subscriber.subscribe(expectedChannel, mockCallback)
    subscriber.subscribe(expectedChannel, mockCallback)
    subscriber.subscribe(expectedChannel, mockCallback)
    pubClient.publish(expectedChannel, JSON.stringify(expectedMessage))
    expect()
  })
  it('check that `subscribe` listens only on one channel', (done) => {
    const expectedChannel = 'test'
    const expectedMessage = { hello: 'world' }
    const wrongChannel = 'wrong'
    const wrongMessage = { world: 'hello' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    subscriber.subscribe(expectedChannel, (message) => {
      expect(message).toEqual(expectedMessage)
      release()
      done()
    })
    pubClient.publish(wrongChannel, JSON.stringify(wrongMessage))
    pubClient.publish(expectedChannel, JSON.stringify(expectedMessage))
  })
  it('check that after `unsubscribe` the callback is no longer called', (done) => {
    const expectedChannel = 'test'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    const mockCallback = jest.fn()
    const unsubscribe1 = subscriber.subscribe(expectedChannel, mockCallback)
    unsubscribe1()
    subscriber.subscribe(expectedChannel, (message) => {
      expect(message).toEqual(expectedMessage)
      expect(mockCallback).not.toHaveBeenCalled()
      release()
      done()
    })
    const unsubscribe2 = subscriber.subscribe(expectedChannel, mockCallback)
    unsubscribe2()
    // unsubscribe called multiple times should not cause any trouble
    unsubscribe1()
    pubClient.publish(expectedChannel, JSON.stringify(expectedMessage))
  })
  it('should subscribe to a pattern correctly', (done) => {
    const channel = 'test.123.pattern'
    const pattern = 'test.*.pattern'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    subscriber.subscribe(pattern, (message) => {
      expect(message).toEqual(expectedMessage)
      release()
      done()
    })
    pubClient.publish(channel, JSON.stringify(expectedMessage))
  })
  it('should unsubscribe from a pattern correctly', (done) => {
    const channel = 'test.123.pattern'
    const pattern = 'test.*.pattern'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    const mockCallback = jest.fn()
    const unsubscribe1 = subscriber.subscribe(pattern, mockCallback)
    unsubscribe1()
    subscriber.subscribe(pattern, (message) => {
      expect(message).toEqual(expectedMessage)
      expect(mockCallback).not.toHaveBeenCalled()
      release()
      done()
    })
    const unsubscribe2 = subscriber.subscribe(pattern, mockCallback)
    unsubscribe2()
    pubClient.publish(channel, JSON.stringify(expectedMessage))
  })
  it('should handle unsubscribe properly', (done) => {
    const channel = 'test.123.pattern'
    const expectedMessage = { hello: 'world' }
    const { pubClient, subscriber, release } = makeSubscribeClientMock()
    // unsubscribe from a non existing channel should work
    subscriber.unsubscribe('channel that does not exists', () => {})
    subscriber.subscribe(channel, (message) => {
      expect(message).toEqual(expectedMessage)
      release()
      done()
    })
    // unsubscribe from an existing channel but with an unkown callback should work
    subscriber.unsubscribe(channel, () => {})
    pubClient.publish(channel, JSON.stringify(expectedMessage))
  })
  it('should discard messages from an unexpected chanels', (done) => {
    const channel = 'test.123.pattern'
    const unexpectedChannel = 'unexpected channel'
    const expectedMessage = { hello: 'world' }
    const {
      pubClient, subClient, subscriber, release,
    } = makeSubscribeClientMock()
    // unsubscribe from a non existing channel should work
    subscriber.subscribe(channel, (message) => {
      expect(message).toEqual(expectedMessage)
      release()
      done()
    })
    subClient.subscribe(unexpectedChannel)
    pubClient.publish(unexpectedChannel, 'malformed message')
    pubClient.publish(channel, JSON.stringify(expectedMessage))
  })
})
