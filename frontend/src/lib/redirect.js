import { routeLocations, isOnWhitelist } from '../pages/route_locations'

export function toLogin(redirect, token) {
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${routeLocations.LOGIN}?redirect=${redirect}&token=${token}`
  }
  return routeLocations.LOGIN
}

export function toRegistration(redirect, token) {
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${routeLocations.REGISTRATION}?redirect=${redirect}&token=${token}`
  }
  return routeLocations.REGISTRATION
}

export function toRedirect(redirect, token) {
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${redirect}?token=${token}`
  }
  return routeLocations.HOMEPAGE
}
