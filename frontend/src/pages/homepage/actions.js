function defaultTimeStamps() {
  const timeStamps = []
  let timeInHours
  for (timeInHours = 6; timeInHours < 20; timeInHours += 0.5) {
    const timeStamp = {
      key: timeInHours * 2,
      hour: Math.floor(timeInHours),
      minute: (timeInHours % 1) * 60,
      userIDs: [],
    }
    timeStamps.push(timeStamp)
  }
  return timeStamps
}

/*
  locations is an array of many locations. One location has the shape of:
    {
      id: number,
      name: string,
      timeStamps: arrayOf({
        key: number,
        hour: number,
        minute: number,
        userIDs: arrayOf({
          id: number,
        })
    }
 */

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
