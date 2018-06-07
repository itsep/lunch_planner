import { routeLocations, isOnWhitelist } from '../pages/route_locations'

function getRedirectAndToken() {
  const result = {
    token: (new URL(window.location.href)).searchParams.get('token'),
    redirect: (new URL(window.location.href)).searchParams.get('redirect'),
  }
  if (result.token && !result.redirect) {
    result.redirect = (new URL(window.location.href)).pathname
  }
  return result
}

export function toLogin() {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${routeLocations.LOGIN}?redirect=${redirect}&token=${token}`
  }
  return routeLocations.LOGIN
}

export function toRegistration() {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${routeLocations.REGISTRATION}?redirect=${redirect}&token=${token}`
  }
  return routeLocations.REGISTRATION
}

export function toRedirect() {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return `${redirect}?token=${token}`
  }
  return routeLocations.HOMEPAGE
}
