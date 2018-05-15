export default function addLocation() {
  return {
    type: 'ADD_LOCATION',
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
    dispatch(receivePageData(lunchspaceSubdomain))
    return fetch('/api/locations', {
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ lunchspaceSubdomain }),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(({ error }) => { throw new Error(error) })
    }).then(data => dispatch(receivePageData(lunchspaceSubdomain, data)))
      .catch(error => console.error(error))
  }
}

