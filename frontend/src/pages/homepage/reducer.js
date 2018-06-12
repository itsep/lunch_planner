import { combineReducers } from 'redux'
import { toEventTimeId } from 'shared/lib/event'
import initialState from './initial_state'
import actionTypes from './action_types'

/*
reducer should get split to multiple reducer and then with combine(reducerList) combined in the end
so its easier to search for an statechange
 */

function reduceCurrentDate(currentDate = initialState.currentDate, action) {
  switch (action.type) {
    case actionTypes.CHANGE_DATE:
      return action.date
    default:
      return currentDate
  }
}
function reduceLunchspace(lunchspace = initialState.lunchspace, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_PAGE_DATA:
      return action.data.lunchspace
    default:
      return lunchspace
  }
}

function reduceUser(user = initialState.user, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_PAGE_DATA:
      return action.data.user
    default:
      return user
  }
}

function reduceParticipantsAtTimestamp(participantsAtTimestamp, action) {
  const { userId } = action.participant
  const eventTimeId = toEventTimeId(action.eventTime)
  const participants = participantsAtTimestamp[eventTimeId] || []
  switch (action.type) {
    case actionTypes.ADD_PARTICIPANT:
      // user already added
      if (participants.indexOf(userId) !== -1) {
        return participantsAtTimestamp
      }
      return {
        ...participantsAtTimestamp,
        [eventTimeId]: [userId, ...participants],
      }
    case actionTypes.REMOVE_PARTICIPANT:
      return (() => {
        // user already removed
        const participantIndex = participants.indexOf(userId)
        if (participantIndex === -1) {
          return participantsAtTimestamp
        }
        const newParticipants = Array.from(participants)
        newParticipants.splice(participantIndex, 1)
        return {
          ...participantsAtTimestamp,
          [eventTimeId]: newParticipants,
        }
      })()
    default:
      return participantsAtTimestamp
  }
}

function reduceLocations(locations = initialState.locations, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_PAGE_DATA:
      return action.data.locations
    case actionTypes.ADD_LOCATION:
      return (() => {
        const { id, ...location } = action.location
        // location already in state
        if (locations[id]) {
          return locations
        }
        return {
          ...locations,
          [id]: location,
        }
      })()
    case actionTypes.ADD_PARTICIPANT:
    case actionTypes.REMOVE_PARTICIPANT:
      return (() => {
        const location = locations[action.locationId]
        return {
          ...locations,
          [action.locationId]: {
            ...location,
            participantsAtTimestamp: reduceParticipantsAtTimestamp(
              location.participantsAtTimestamp,
              action
            ),
          },
        }
      })()
    default:
      return locations
  }
}


function reduceLocationsInLunchspace(
  locationsInLunchspace = initialState.locationsInLunchspace,
  action
) {
  switch (action.type) {
    case actionTypes.RECEIVE_PAGE_DATA:
      return action.data.locationsInLunchspace
    case actionTypes.ADD_LOCATION:
      return (() => {
        const { id } = action.location
        // location already in state
        if (locationsInLunchspace.indexOf(id) !== -1) {
          return locationsInLunchspace
        }
        return [...locationsInLunchspace, id]
      })()
    default:
      return locationsInLunchspace
  }
}

function reduceUsers(users = initialState.users, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_PAGE_DATA:
      return action.data.users
    case actionTypes.ADD_PARTICIPANT:
      return (() => {
        const { userId, ...participant } = action.participant
        if (users[userId]) {
          return users
        }
        return {
          ...users,
          [userId]: participant,
        }
      })()
    default:
      return users
  }
}

function reduceIsLoadingLocations(isLoadingLocations = false, action) {
  switch (action.type) {
    case actionTypes.REQUEST_PAGE_DATA:
      return true
    case actionTypes.RECEIVE_PAGE_DATA:
      return false
    default:
      return isLoadingLocations
  }
}

function reduceSelectedEvent(selectedEvent = null, action) {
  switch (action.type) {
    case actionTypes.OPEN_EVENT_DIALOG:
      return {
        show: true,
        locationId: action.locationId,
        eventTimeId: action.eventTimeId,
        selectedUserId: action.selectedUserId,
      }
    case actionTypes.CLOSE_EVENT_DIALOG:
      return {
        ...selectedEvent,
        show: false,
      }
    default:
      return selectedEvent
  }
}

const reducer = combineReducers({
  currentDate: reduceCurrentDate,
  lunchspace: reduceLunchspace,
  user: reduceUser,
  locations: reduceLocations,
  locationsInLunchspace: reduceLocationsInLunchspace,
  users: reduceUsers,
  isLoadingLocations: reduceIsLoadingLocations,
  selectedEvent: reduceSelectedEvent,
})
export default reducer
