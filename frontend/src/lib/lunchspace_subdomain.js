import withQuery from 'with-query'
import { parseSubdomainFromHost } from 'shared/lib/subdomain'
/* eslint-disable no-restricted-globals */
const applicationDomain = 'mylunch.space'

/**
 * return the domain without any subdomain
 * @param hostname
 * @returns {string} domain
 */
function domainFromHost(hostname) {
  const domainParts = hostname.split('.')
  if (domainParts <= 2) {
    return hostname
  }
  return `${domainParts[domainParts.length - 1]}.${domainParts[domainParts.length - 1]}`
}

export function shouldUseDevelopmentSubdomainHandling() {
  return domainFromHost(location.hostname) !== applicationDomain
}

export function domainForLunchspace(subdomain) {
  return `${subdomain}.${applicationDomain}`
}

export function currentLunchspaceSubdomain() {
  const parsedSubdomain = parseSubdomainFromHost(location.hostname) ||
    new URLSearchParams(location.search).get('subdomain')
  // `www` is never a lunchspace subdomain
  if (parsedSubdomain === 'www') {
    return undefined
  }
  return parsedSubdomain
}

export function withLunchspaceSubdomain(
  url,
  subdomain = currentLunchspaceSubdomain(),
  absoule = false
) {
  if (shouldUseDevelopmentSubdomainHandling()) {
    return withQuery(url, { subdomain })
  }
  if (absoule) {
    return `//${subdomain}.${applicationDomain}${url}`
  }
  return url
}
