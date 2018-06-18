import { withLunchspaceSubdomain } from '../lib/lunchspace_subdomain'

const routeLocations = {
  HOMEPAGE: '/homepage.html',
  LOGIN: '/login.html',
  REGISTRATION: '/registration.html',
  CREATE_LUNCHSPACE: '/create_lunchspace.html',
  LUNCHSPACES: '/lunchspaces.html',
  PROFILE: '/profile.html',
  JOIN_LUNCHSPACE: '/join_lunchspace.html',
  IMPRINT: '/imprint.html',
}

export function isOnWhitelist(redirectRoute) {
  const whiteListRoutes = Object.keys(routeLocations).map(key => routeLocations[key])
  return (whiteListRoutes.indexOf(redirectRoute) >= 0)
}

export function redirect(url) {
  window.location.href = withLunchspaceSubdomain(url)
}

export default routeLocations
