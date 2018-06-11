import withQuery from 'with-query'
import routeLocations, { isOnWhitelist } from '../pages/route_locations'

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

export function toRedirect(url) {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return withQuery(url, {
      redirect,
      token,
    })
  }
  return url
}

export function returnFromRedirect() {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return withQuery(redirect, {
      token,
    })
  }
  return routeLocations.HOMEPAGE
}
