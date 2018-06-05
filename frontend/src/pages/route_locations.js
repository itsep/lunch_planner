export const routeLocations = {
  HOMEPAGE: '/homepage.html',
  LOGIN: '/login.html',
  REGISTRATION: '/registration.html',
  CREATE_LUNCHSPACE: '/create_lunchspace.html',
  JOIN_LUNCHSPACE: '/join_lunchspace.html',
}

export function isOnWhitelist(redirect) {
  const whiteListRoutes = Object.keys(routeLocations).map(key => routeLocations[key])
  return (whiteListRoutes.indexOf(redirect) >= 0)
}
