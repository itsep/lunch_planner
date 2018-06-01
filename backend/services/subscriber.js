const socketIO = require('socket.io')
const cookieParser = require('socket.io-cookie-parser')
const redis = require('redis')
const SubscriberClient = require('../lib/redis/subscribe_client')
const { locationChannel, joinUpAt } = require('../lib/lunchspace_channels')
const { toEventDate, toEventDateId } = require('../../shared/lib/event')
const { authenticateSocket } = require('../middleware/authenticate')
const { checkLunchspacePermissionOfSocket } = require('../middleware/lunchspace_permission')

const io = socketIO(8090)
const subscriber = SubscriberClient(redis.createClient())

io.use(cookieParser())
io.use(authenticateSocket)
io.use(checkLunchspacePermissionOfSocket)
io.on('connection', (socket) => {
  const { id: lunchspaceId } = socket.lunchspace
  const eventDate = toEventDate(new Date())
  const emitToSocket = (message) => {
    socket.emit('change', message)
  }
  const unsubscriber = [
    subscriber.subscribe(locationChannel(lunchspaceId, '*'), emitToSocket),
    subscriber.subscribe(joinUpAt(lunchspaceId, '*', toEventDateId(eventDate), '*'), emitToSocket),
  ]
  socket.on('disconnect', () => {
    unsubscriber.forEach(unsubscribe => unsubscribe())
  })
})
