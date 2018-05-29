import actionTypes from './action_types'
import routeLocations from '../route_locations'

export function addUser(eventTime, locationID, user) {
  return {
    type: actionTypes.ADD_USER,
    eventTime,
    locationID,
    user,
  }
}

/*
creates array with empty timestamps
 */
function defaultTimeStamps() {
  const timeStamps = []
  let timeInHours
  let counter = 0
  for (timeInHours = 10; timeInHours < 18; timeInHours += 0.5) {
    const timeStamp = {
      id: counter,
      key: timeInHours * 2,
      hour: Math.floor(timeInHours),
      minute: (timeInHours % 1) * 60,
      userIDs: [],
      participants: [],
    }
    timeStamps.push(timeStamp)
    counter += 1
  }
  return timeStamps
}

function createLocation(name, id) {
  return {
    id,
    name,
    timeStamps: defaultTimeStamps(),
  }
}

export function addLocation(locationName, locationID) {
  return {
    type: actionTypes.ADD_LOCATION,
    location: createLocation(locationName, locationID),
  }
}

export function setError(error) {
  return {
    type: actionTypes.SET_ERROR,
    error,
  }
}

export function resetError() {
  return {
    type: actionTypes.RESET_ERROR,
  }
}

export function deleteUser(eventTime, locationID, user) {
  return {
    type: actionTypes.DELETE_USER,
    eventTime,
    locationID,
    user,
  }
}

export function fetchCreateLocation(locationName, lunchspace) {
  return dispatch => fetch('/api/location/', {
    method: 'POST',
    headers: {
      subdomain: lunchspace.subdomain,
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      name: locationName,
      coordinates: { lat: 0, long: 0 },
      lunchspace,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        dispatch(addLocation(locationName, data.locationId))
      })
    }
    return response.json().then(({ error }) => {
      dispatch(setError(error))
    })
  }).catch(error => console.error(error))
}

export function fetchLogout() {
  return () => fetch('/api/account/logout', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  }).then((response) => {
    if (response.ok) {
      window.location = routeLocations.LOGIN
      return response.json()
    }
    return response.json().then(({ error }) => {
      throw new Error(error)
    })
  }).catch(error => console.error(error))
}

function toEventTime(timeStamp) {
  const hours = timeStamp.hour < 10 ? `0${timeStamp.hour}` : `${timeStamp.hour}`
  const minutes = timeStamp.minute < 10 ? `0${timeStamp.minute}` : `${timeStamp.minute}`
  return `${hours}:${minutes}:00`
}

/*
should insert participants into correct timestamps
is not working perfectly right now
 */
function initialTimeStamps(locationID, participants) {
  let timeStamps = defaultTimeStamps()
  participants.forEach((participant) => {
    if (locationID === participant.locationId) {
      timeStamps = timeStamps.map((timeStamp) => {
        // sometimes timestamp is undefined??
        if (!timeStamp) {
          return timeStamp
        }
        const eventTime = toEventTime(timeStamp)
        if (eventTime === participant.eventTime) {
          return {
            ...timeStamp,
            userIDs: [participant.userId, ...timeStamp.userIDs],
            participants: [participant, ...timeStamp.participants],
          }
        }
        return timeStamp
      })
    }
  })
  return timeStamps
}

export function requestPageData(lunchspaceSubdomain) {
  return {
    type: actionTypes.REQUEST_PAGE_DATA,
    lunchspaceSubdomain,
  }
}

export function receivePageData(lunchspaceSubdomain, response) {
  const data = response
  data.locations = data.locations.map(location => ({
    ...location,
    timeStamps: initialTimeStamps(location.id, data.participants),
  }))
  return {
    type: actionTypes.RECEIVE_PAGE_DATA,
    lunchspaceSubdomain,
    data,
  }
}

/*
gets data of backend and change state with dispatch
 */
export function fetchPageData(lunchspaceSubdomain) {
  return (dispatch) => {
    dispatch(requestPageData(lunchspaceSubdomain))
    return fetch('/api/location', {
      headers: {
        'content-type': 'application/json',
        subdomain: lunchspaceSubdomain,
      },
      credentials: 'same-origin',
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(({ error }) => { throw new Error(error) })
    }).then((data) => {
      dispatch(receivePageData(lunchspaceSubdomain, data))
    })
      .catch(error => console.error(error))
  }
}

export function joinEvent(lunchspaceSubdomain, locationId, eventTime, eventDate, participant) {
  return (dispatch) => {
    fetch('/api/event', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        subdomain: lunchspaceSubdomain,
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        locationId,
        eventTime,
        eventDate,
      }),
    }).then(() => dispatch(addUser(eventTime, locationId, participant)))
  }
}
export function leaveEvent(lunchspaceSubdomain, locationId, eventTime, eventDate, participant) {
  return (dispatch) => {
    fetch('/api/event', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        subdomain: lunchspaceSubdomain,
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        locationId,
        eventTime,
        eventDate,
      }),
    }).then(() => dispatch(deleteUser(eventTime, locationId, participant)))
  }
}

