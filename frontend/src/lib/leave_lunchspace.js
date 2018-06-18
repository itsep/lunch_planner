import apiFetch from './api_fetch'
import routeLocations, { redirect } from '../pages/route_locations'

export function redirectToLunchspaces() {
  redirect(routeLocations.LUNCHSPACES)
}

export function leaveLunchspace(redirectCallback) {
  return () => apiFetch('/api/lunchspace/leave', {
    method: 'DELETE',
  }).then(redirectCallback, redirectCallback)
}

export const leave = leaveLunchspace(redirectToLunchspaces)
