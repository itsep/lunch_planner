export function addUser(timeStampID, locationID, userID) {
  return {
    type: 'ADD_USER',
    timeStampID,
    locationID,
    userID,
  }
}

export function deleteUser(timeStampID, locationID, userID) {
  return {
    type: 'DELETE_USER',
    timeStampID,
    locationID,
    userID,
  }
}

function defaultTimeStamps() {
  const timeStamps = []
  let timeInHours
  let counter = 0
  for (timeInHours = 6; timeInHours < 20; timeInHours += 0.5) {
    const timeStamp = {
      id: counter,
      key: timeInHours * 2,
      hour: Math.floor(timeInHours),
      minute: (timeInHours % 1) * 60,
      userIDs: [],
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
    type: 'ADD_LOCATION',
    location: createLocation(locationName, locationID),
  }
}

export function requestPageData(lunchspaceSubdomain) {
  return {
    type: 'REQUEST_PAGE_DATA',
    lunchspaceSubdomain,
  }
}

export function receivePageData(lunchspaceSubdomain, response) {
  const data = response
  data.locations = data.locations.map(location => ({
    ...location,
    timeStamps: defaultTimeStamps(),
  }))
  return {
    type: 'RECEIVE_PAGE_DATA',
    lunchspaceSubdomain,
    data,
  }
}

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
