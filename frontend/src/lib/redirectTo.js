import withQuery from 'with-query'
import routeLocations, { isOnWhitelist } from '../pages/route_locations'

function getRedirectAndToken() {
  const url = new URL(window.location.href)
  const result = {
    token: url.searchParams.get('token'),
    redirect: url.searchParams.get('redirect'),
  }
  if (result.token && !result.redirect) {
    result.redirect = url.pathname
  }
  return result
}

function returnFromRedirect() {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    return withQuery(redirect, {
      token,
    })
  }
  return routeLocations.HOMEPAGE
}


export default function redirectTo(url) {
  const { token, redirect } = getRedirectAndToken()
  if (redirect && token && isOnWhitelist(redirect)) {
    if (url === routeLocations.LOGIN || url === routeLocations.REGISTRATION) {
      return withQuery(url, {
        redirect,
        token,
      })
    }
    return returnFromRedirect()
  }
  return url
}
