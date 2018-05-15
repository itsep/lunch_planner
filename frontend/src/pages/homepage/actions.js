export function addLocation() {
  return {
    type: 'ADD_LOCATION',
  }
}

function createTimeStamps() {
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

export function addTimeStamps(id) {
  return {
    type: 'ADD_TIMESTAMPS',
    timeStamps: createTimeStamps(),
    locationID: id,
  }
}

export function requestPageData(lunchspaceSubdomain) {
  return {
    type: 'REQUEST_PAGE_DATA',
    lunchspaceSubdomain,
  }
}

export function receivePageData(lunchspaceSubdomain, data) {
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
    }).then(data => dispatch(receivePageData(lunchspaceSubdomain, data)))
      .catch(error => console.error(error))
  }
}

