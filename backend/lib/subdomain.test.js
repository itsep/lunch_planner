const {
  parseSubdomainFromQuery,
  subdomainFromHostOrQuery,
} = require('./subdomain')

describe('subdomain', () => {
  describe('parseSubdomainFromQuery', () => {
    it('should return undefined if the object does not contain a subdomain property', () => {
      expect(parseSubdomainFromQuery({ unkownKey: 'vsf-experts' })).toBeUndefined()
    })
    it('should return the subdomain in the object', () => {
      expect(parseSubdomainFromQuery({ subdomain: 'vsf-experts' })).toEqual('vsf-experts')
    })
  })
  describe('subdomainFromHostOrQuery', () => {
    it('should return the subdomain defined in the host header over the subdomain defined in the query', () => {
      expect(subdomainFromHostOrQuery(
        { host: 'subdomain-in-host.example.com' },
        { subdomain: 'subdomain-in-query' }
      )).toEqual('subdomain-in-host')
      expect(subdomainFromHostOrQuery(
        { host: 'www.subdomain-in-host.example.com' },
        {}
      )).toEqual('subdomain-in-host')
    })
    it('should return the subdomain defined in the query if no subdomain could be parsed from the host header', () => {
      expect(subdomainFromHostOrQuery(
        { host: 'invalid.subdomain-in-host.example.com' },
        { subdomain: 'subdomain-in-query' }
      )).toEqual('subdomain-in-query')
      expect(subdomainFromHostOrQuery(
        {},
        { subdomain: 'subdomain-in-query' }
      )).toEqual('subdomain-in-query')
    })
    it('should return undefined if no subdomain could be found in either options', () => {
      expect(subdomainFromHostOrQuery(
        { host: 'invalid.subdomain-in-host.example.com' },
        { }
      )).toBeUndefined()
      expect(subdomainFromHostOrQuery(
        {},
        {}
      )).toBeUndefined()
    })
  })
})
