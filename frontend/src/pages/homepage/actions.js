import withQuery from 'with-query'
import actionTypes from './action_types'
import { routeLocations } from '../route_locations'
import apiFetch from '../../lib/api_fetch'

export function addParticipant(eventTime, locationId, participant) {
  return {
    type: actionTypes.ADD_PARTICIPANT,
    eventTime,
    locationId,
    participant,
  }
}

function createLocation(name, id) {
  return {
    id,
    name,
    participantsAtTimestamp: {},
  }
}

export function addLocation(locationName, locationId) {
  return {
    type: actionTypes.ADD_LOCATION,
    location: createLocation(locationName, locationId),
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

export function removeParticipant(eventTime, locationId, participant) {
  return {
    type: actionTypes.REMOVE_PARTICIPANT,
    eventTime,
    locationId,
    participant,
  }
}

export function fetchCreateLocation(locationName, lunchspace) {
  return dispatch => apiFetch('/api/location/', {
    method: 'POST',
    headers: {
      subdomain: lunchspace.subdomain,
    },
    body: {
      name: locationName,
      coordinates: { lat: 0, long: 0 },
      lunchspace,
    },
  }).then(({ data }) => dispatch(addLocation(locationName, data.locationId)))
    .catch(error => dispatch(setError(error)))
}

export function fetchLogout() {
  return () => apiFetch('/api/account/logout', {
    method: 'POST',
  }).then(() => {
    window.location = routeLocations.LOGIN
  })
    .catch(error => console.error(error))
}

export function requestPageData(lunchspaceSubdomain) {
  return {
    type: actionTypes.REQUEST_PAGE_DATA,
    lunchspaceSubdomain,
  }
}

export function receivePageData(lunchspaceSubdomain, data) {
  return {
    type: actionTypes.RECEIVE_PAGE_DATA,
    lunchspaceSubdomain,
    data,
  }
}

/*
gets data of backend and change state with dispatch
 */
export function fetchPageData(lunchspaceSubdomain, date) {
  return (dispatch) => {
    dispatch(requestPageData(lunchspaceSubdomain))
    return apiFetch(withQuery('/api/location/', { date: date.toISOString().substring(0, 10) }), {
      headers: {
        subdomain: lunchspaceSubdomain,
      },
    }).then(({ data }) => dispatch(receivePageData(lunchspaceSubdomain, data)))
      // TODO: handle error by dispatching an error action
      .catch(error => console.error(error))
  }
}

export function joinEvent(lunchspaceSubdomain, locationId, eventTime, eventDate, participant) {
  return (dispatch) => {
    apiFetch('/api/event', {
      method: 'PUT',
      headers: {
        subdomain: lunchspaceSubdomain,
      },
      body: {
        locationId,
        eventTime,
        eventDate,
      },
    }).then(() => dispatch(addParticipant(eventTime, locationId, participant)))
      // TODO: handle error by dispatching an error action
      .catch(error => console.error(error))
  }
}
export function leaveEvent(lunchspaceSubdomain, locationId, eventTime, eventDate, participant) {
  return (dispatch) => {
    apiFetch('/api/event', {
      method: 'DELETE',
      headers: {
        subdomain: lunchspaceSubdomain,
      },
      body: {
        locationId,
        eventTime,
        eventDate,
      },
    }).then(() => dispatch(removeParticipant(eventTime, locationId, participant)))
      // TODO: handle error by dispatching an error action
      .catch(error => console.error(error))
  }
}

