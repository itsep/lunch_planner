require('dotenv').load()
require('../../shared/lib/promise_polyfill')
const socketIO = require('socket.io')
const cookieParser = require('socket.io-cookie-parser')
const redis = require('redis')
const SubscriberClient = require('../lib/redis/subscribe_client')
const { locationChannel, joinUpAt } = require('../lib/lunchspace_channels')
const { toEventDateId } = require('../../shared/lib/event')
const { authenticateSocket } = require('../middleware/authenticate')
const { checkLunchspacePermissionOfSocket } = require('../middleware/lunchspace_permission')

const io = socketIO(9200, { path: '/subscriber' })
const subscriber = new SubscriberClient(redis.createClient())

function subscribeToAllLocationChanges(lunchspaceId, eventDate, callback) {
  const unsubscriber = [
    subscriber.subscribe(locationChannel(lunchspaceId, '*'), callback),
    subscriber.subscribe(joinUpAt(lunchspaceId, '*', toEventDateId(eventDate), '*'), callback),
  ]
  return () => {
    unsubscriber.forEach(unsubscribe => unsubscribe())
  }
}

io.use(cookieParser())
io.use(authenticateSocket)
io.use(checkLunchspacePermissionOfSocket)
io.on('connection', (socket) => {
  const { id: lunchspaceId } = socket.lunchspace
  const emitToSocket = (message) => {
    socket.emit('change', message)
  }
  let unsubscribe
  socket.on('subscribeToAllLocationChanges', (eventDate) => {
    if (unsubscribe) {
      unsubscribe()
    }
    unsubscribe = subscribeToAllLocationChanges(lunchspaceId, eventDate, emitToSocket)
  })

  socket.on('disconnect', () => {
    if (unsubscribe) {
      unsubscribe()
    }
  })
})
