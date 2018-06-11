import { toEventDateFromMoment } from 'shared/lib/event'
import { addParticipant, removeParticipant, addLocation } from './actions'

export default class ChangeDispatcher {
  static actionForMessage(message) {
    switch (message.action) {
      case 'joinEvent':
        return addParticipant(
          message.eventTime,
          message.locationId,
          message.participant
        )
      case 'leaveEvent':
        return removeParticipant(
          message.eventTime,
          message.locationId,
          message.participant
        )
      case 'createLocation':
        // TODO: add coordinate
        return addLocation(
          message.name,
          message.locationId
        )
      default:
        return null
    }
  }
  constructor(socket, store) {
    this.socket = socket
    this.store = store

    this.socket.on('connect', this.onConnect.bind(this))
    this.socket.on('change', this.onChange.bind(this))
    this.store.subscribe(this.onStateChange.bind(this))
  }

  subscribeToAllLocationChanges(date) {
    this.currentDate = date
    this.socket.emit('subscribeToAllLocationChanges', toEventDateFromMoment(date))
  }

  onConnect() {
    if (this.currentDate) {
      this.subscribeToAllLocationChanges(this.currentDate)
    }
  }
  onChange(message) {
    // TODO: check if message is still relevant for currentDate
    const action = ChangeDispatcher.actionForMessage(message)
    if (action) {
      this.store.dispatch(action)
    } else {
      console.info('No action for message found:', message)
    }
  }
  onStateChange() {
    const { currentDate } = this.store.getState()
    if (currentDate !== this.currentDate) {
      this.currentDate = currentDate
      this.subscribeToAllLocationChanges(currentDate)
    }
  }
}
