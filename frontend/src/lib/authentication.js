import Cookie from 'js-cookie'
import { withLunchspaceSubdomain } from './lunchspace_subdomain'
import apiFetch from './api_fetch'
import routeLocations from '../pages/route_locations'


const isProbablyAuthenticatedCookieName = 'authenticated'
/**
 * checks if a token exists as a cookie
 */
export function isProbablyAuthenticated() {
  return Cookie.get(isProbablyAuthenticatedCookieName) === '1'
}
/**
 * checks if a token does not exists as a cookie
 */
export function isDefinitelyNotAuthenticated() {
  return Cookie.get(isProbablyAuthenticatedCookieName) !== '1'
}

export function logout() {
  return apiFetch('/api/account/logout', {
    method: 'POST',
  }).then(() => {
    window.location = withLunchspaceSubdomain(routeLocations.LOGIN)
  })
}
