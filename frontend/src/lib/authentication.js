import Cookie from 'js-cookie'
import { withLunchspaceSubdomain } from './lunchspace_subdomain'
import apiFetch from './api_fetch'
import routeLocations from '../pages/route_locations'


const tokenCookieName = 'lunch_planner_token'
/**
 * checks if a token exists as a cookie
 */
export function isProbablyAuthenticated() {
  return typeof Cookie.get(tokenCookieName) === 'string'
}
/**
 * checks if a token does not exists as a cookie
 */
export function isDefinitelyNotAuthenticated() {
  return typeof Cookie.get(tokenCookieName) !== 'string'
}

export function logout() {
  apiFetch('/api/account/logout', {
    method: 'POST',
  }).then(() => {
    window.location = withLunchspaceSubdomain(routeLocations.LOGIN)
  })
}
