const { parseSubdomainFromHost } = require('../../shared/lib/subdomain')

function parseSubdomainFromQuery(query) {
  if (query.subdomain) {
    return query.subdomain
  }
  return undefined
}

function subdomainFromHostOrQuery(headers, query) {
  return parseSubdomainFromQuery(query) || parseSubdomainFromHost(headers.Host || headers.host)
}

module.exports = {
  parseSubdomainFromQuery,
  subdomainFromHostOrQuery,
}
