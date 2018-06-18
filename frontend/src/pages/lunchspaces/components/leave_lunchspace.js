import apiFetch from '../../../lib/api_fetch'
import routeLocations, { redirect } from '../../route_locations'

export function redirectToLunchspaces() {
  redirect(routeLocations.LUNCHSPACES)
}

export function leaveLunchspace(redirectCallback) {
  return () => apiFetch('/api/lunchspace/leave', {
    method: 'DELETE',
  }).then(redirectCallback, redirectCallback)
}

export const leave = leaveLunchspace(redirectToLunchspaces)
