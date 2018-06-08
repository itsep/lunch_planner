const { parseSubdomainFromHost } = require('../../shared/lib/subdomain')

function parseSubdomainFromQuery(query) {
  if (query.subdomain) {
    return query.subdomain
  }
  return undefined
}

function subdomainFromHostOrQuery(headers, query) {
  return parseSubdomainFromHost(headers.Host || headers.host) ||
    parseSubdomainFromQuery(query)
}

module.exports = {
  parseSubdomainFromQuery,
  subdomainFromHostOrQuery,
}
