import Cookie from 'js-cookie'

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
