const validCharactersRegex = /[a-z0-9]|-/

function isValidSubdomainChar(char) {
  return validCharactersRegex.test(char)
}

const validSubdomainRegex = /^([a-z0-9]([a-z0-9]|-[a-z0-9])*)?$/

function isValidSubdomain(text) {
  return validSubdomainRegex.test(text)
}

const charMapping = {
  ' ': '-',
}

function escapeSubdomain(text) {
  if (!text) {
    return ''
  }
  return text.trim().toLowerCase().split('').map((char) => {
    if (isValidSubdomainChar(char)) {
      return char
    }
    // map the char to a valid subdomain char or remove it
    return charMapping[char] || ''
  })
    .join('')
}

/**
 * parses the given domain and returns the subdomain.
 * Valid inputs are for example:
 * - subdomain.example.de
 * - www.subdomain.example.de
 * @param {String} host
 * @returns {string|undefined} the subdomain or undefined if it could not be found
 */
function parseSubdomainFromHost(host) {
  if (typeof host !== 'string') {
    return undefined
  }
  const domainParts = host.split('.')

  // Pattern: subdomain.example.de
  //             [0]     [1]   [2]
  if (domainParts.length === 3 && domainParts[0].length > 0) {
    return domainParts[0]
  }
  // Pattern: www.subdomain.example.de
  //          [0]     [1]   [2]    [3]
  if (domainParts.length === 4 && domainParts[0] === 'www' && domainParts[1].length > 0) {
    return domainParts[1]
  }

  return undefined
}

module.exports = {
  isValidSubdomainChar,
  isValidSubdomain,
  escapeSubdomain,
  parseSubdomainFromHost,
}

