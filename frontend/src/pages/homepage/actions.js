import withQuery from 'with-query'
import { toEventDate, toEventDateId } from 'shared/lib/event'
import moment from '../../lib/localized_moment'
import { currentLunchspaceSubdomain } from '../../lib/lunchspace_subdomain'
import actionTypes from './action_types'
import apiFetch from '../../lib/api_fetch'
import { logout } from '../../lib/authentication'
import routeLocations from '../route_locations'
import NotificationPermissionRequester from '../../lib/serviceworker-registration'

export function addParticipant(eventTime, locationId, participant) {
  return {
    type: actionTypes.ADD_PARTICIPANT,
    eventTime,
    locationId,
    participant,
  }
}

export function setLunchspaces(lunchspaces) {
  return {
    type: actionTypes.SET_LUNCHSPACES,
    lunchspaces,
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

export function removeLocation(locationId) {
  return {
    type: actionTypes.REMOVE_LOCATION,
    locationId,
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
    body: {
      name: locationName,
      coordinates: { lat: 0, long: 0 },
      lunchspace,
    },
  }).then(({ data }) => dispatch(addLocation(locationName, data.locationId)))
    .catch(error => dispatch(setError(error)))
}

export function fetchDeleteLocation(locationId) {
  // TODO: remove force delete and handle delete with care
  return dispatch => apiFetch('/api/location', {
    method: 'DELETE',
    body: {
      locationId,
      forceDelete: true,
    },
  }).catch(error => dispatch(setError(error)))
}

export function fetchLogout() {
  return () => logout()
    .catch(error => console.error(error))
}

export function requestPageData() {
  return {
    type: actionTypes.REQUEST_PAGE_DATA,
  }
}

export function receivePageData(data) {
  const currentSubdomain = currentLunchspaceSubdomain()
  // eslint-disable-next-line no-param-reassign
  data.lunchspace = data.lunchspaces
    .find(lunchspace => lunchspace.subdomain === currentSubdomain)
  return {
    type: actionTypes.RECEIVE_PAGE_DATA,
    data,
  }
}

/*
gets data of backend and change state with dispatch
 */
export function fetchPageData(date) {
  window.d = date
  console.log(date)
  return (dispatch) => {
    dispatch(requestPageData())
    return apiFetch(withQuery('/api/location/', { date: toEventDateId(toEventDate(date.toDate())) }))
      .then(({ data }) => {
        dispatch(setLunchspaces(data.lunchspaces))
        dispatch(receivePageData(data))
      })
      // TODO: handle error by dispatching an error action
      .catch((error) => {
        if (error.status === 409) {
          window.location = routeLocations.LUNCHSPACES
        } else {
          console.error(error)
        }
      })
  }
}

export function joinEvent(locationId, eventTime, eventDate, participant) {
  return dispatch => apiFetch('/api/event', {
    method: 'PUT',
    body: {
      locationId,
      eventTime,
      eventDate,
    },
  }).then(() => dispatch(addParticipant(eventTime, locationId, participant)))
    // TODO: handle error by dispatching an error action
    .catch(error => console.error(error))
}
export function leaveEvent(locationId, eventTime, eventDate, participant) {
  return dispatch => apiFetch('/api/event', {
    method: 'DELETE',
    body: {
      locationId,
      eventTime,
      eventDate,
    },
  }).then(() => dispatch(removeParticipant(eventTime, locationId, participant)))
  // TODO: handle error by dispatching an error action
    .catch(error => console.error(error))
}

export function openEventDialog(locationId, eventTimeId, selectedUserId) {
  return {
    type: actionTypes.OPEN_EVENT_DIALOG,
    locationId,
    eventTimeId,
    selectedUserId,
  }
}

export function closeEventDialog() {
  return {
    type: actionTypes.CLOSE_EVENT_DIALOG,
  }
}

function changeDate(date) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_DATE,
      date,
    })
    dispatch(fetchPageData(date))
  }
}

function changeDayBy(dayOffset) {
  return (dispatch, getState) => {
    const newDate = getState().currentDate.clone().add(dayOffset, 'day')
    dispatch(changeDate(newDate))
  }
}

export function nextDay() {
  return changeDayBy(+1)
}

export function previousDay() {
  return changeDayBy(-1)
}

export function resetDateToToday() {
  return changeDate(moment())
}

export function askNicelyForNotificationPermission() {
  return {
    type: actionTypes.ASK_NICELY_FOR_NOTIFICATION_PERMISSION,
    shoudlAskNicelyForNotificationPermission:
      NotificationPermissionRequester.shared.shouldAskUserNicely(),
  }
}

export function requestNotificationPermission() {
  NotificationPermissionRequester.shared.requestPermissionAndSubscribe()
  return {
    type: actionTypes.REQUEST_NOTIFICATION_PERMISSION,
    shoudlAskNicelyForNotificationPermission: false,
  }
}

export function askLaterForNotificationPermission() {
  NotificationPermissionRequester.shared.askLaterAgain()
  return {
    type: actionTypes.ASK_LATER_FOR_NOTIFICATION_PERMISSION,
    shoudlAskNicelyForNotificationPermission: false,
  }
}
