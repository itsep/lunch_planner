import withQuery from 'with-query'
import { parseSubdomainFromHost } from 'shared/lib/subdomain'

const applicationDomain = 'mylunch.space'

function topLevelDomainFromHost(hostname) {
  const domainParts = hostname.split('.')
  return domainParts[domainParts.length - 1]
}

export function shouldUseDevelopmentSubdomainHandling() {
  return window.location.hostname === 'localhost' ||
    topLevelDomainFromHost(window.location.hostname) === 'local'
}

export function domainForLunchspace(subdomain) {
  return `${subdomain}.${applicationDomain}`
}

export function currentLunchspaceSubdomain() {
  const parsedSubdomain = parseSubdomainFromHost(window.location.hostname) ||
    new URLSearchParams(window.location.search).get('subdomain')
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
