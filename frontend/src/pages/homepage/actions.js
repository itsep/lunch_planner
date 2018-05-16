import actionTypes from './action_types'

export function addUser(timeStampID, locationID, user) {
  return {
    type: actionTypes.ADD_USER,
    timeStampID,
    locationID,
    user,
  }
}

export function deleteUser(timeStampID, locationID, user) {
  return {
    type: actionTypes.DELETE_USER,
    timeStampID,
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
