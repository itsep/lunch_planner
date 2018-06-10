module.exports = {
  debug: true,
  token: {
    // token lifetime in milliseconds
    lifetime: 1000 * 60 * 60 * 24 * 7,
    onlyHttps: false,
    // the name of the cookie which contains the token
    // it is not accessible from javascript (httpOnly: true)
    cookieName: 'lunch_planner_token',
    // another cookie which only purpose is to indicate that the user is probably authenticated
    // this cookie is accessible from javascript, the token ist not accessable from javascript!
    isProbablyAuthenticatedCookieName: 'authenticated',
  },
  host: 'localhost:8080',
  database: {
    name: 'lunch_planner',
  },
  subdomainBlacklist: [
    'www',
    'all',
    'demo',
    'beta',
  ],
}
