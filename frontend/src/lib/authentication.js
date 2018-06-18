import Cookie from 'js-cookie'
import apiFetch from './api_fetch'
import routeLocations, { redirect } from '../pages/route_locations'

export function redirectToLogin() {
  redirect(routeLocations.LOGIN)
}

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

export function makeLogout(redirectCallback) {
  return () => apiFetch('/api/account/logout', {
    method: 'POST',
  }).then(redirectCallback, redirectCallback)
}

export const logout = makeLogout(redirectToLogin)
