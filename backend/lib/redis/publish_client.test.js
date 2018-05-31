const redisMock = require('redis-mock')
const PublisherClient = require('./publish_client')

function makePublishClientMock() {
  const pubClient = redisMock.createClient()
  const subClient = redisMock.createClient()
  const publisher = new PublisherClient(pubClient)
  const release = () => {
    pubClient.end()
    subClient.end()
  }
  return {
    pubClient, subClient, publisher, release,
  }
}

describe('PublishClient', () => {
  it('check that `publish` is publishing on the correct channel', (done) => {
    const expectedChannel = 'test'
    const expectedMessage = { hello: 'world' }
    const { subClient, publisher, release } = makePublishClientMock()
    subClient.subscribe(expectedChannel)
    subClient.on('message', (channel, message) => {
      expect(channel).toEqual(expectedChannel)
      expect(message).toEqual(JSON.stringify(expectedMessage))
      release()
      done()
    })
    publisher.publish(expectedChannel, expectedMessage)
  })
})
