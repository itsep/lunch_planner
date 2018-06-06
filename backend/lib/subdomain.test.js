const {
  parseSubdomainFromHost,
  parseSubdomainFromQuery,
  subdomainFromHostOrQuery,
} = require('./subdomain')

describe('subdomain', () => {
  describe('parseSubdomainFromHost', () => {
    it('should parse invalid subdomains without throwing and it should return undefined', () => {
      expect(parseSubdomainFromHost('lunchspace.de')).toBeUndefined()
      expect(parseSubdomainFromHost('.lunchspace.de')).toBeUndefined()
      expect(parseSubdomainFromHost('www..lunchspace.de')).toBeUndefined()
      expect(parseSubdomainFromHost('two.subdomains.lunchspace.de')).toBeUndefined()
      expect(parseSubdomainFromHost('.de')).toBeUndefined()
      expect(parseSubdomainFromHost('')).toBeUndefined()
      expect(parseSubdomainFromHost(undefined)).toBeUndefined()
      expect(parseSubdomainFromHost(false)).toBeUndefined()
      expect(parseSubdomainFromHost(true)).toBeUndefined()
      expect(parseSubdomainFromHost(1)).toBeUndefined()
      expect(parseSubdomainFromHost({})).toBeUndefined()
    })
    it('should parse valid subdomains with exactly three parts', () => {
      expect(parseSubdomainFromHost('vsf-experts.lunchspace.de')).toEqual('vsf-experts')
      expect(parseSubdomainFromHost('vsf-experts.example.com')).toEqual('vsf-experts')
      expect(parseSubdomainFromHost('vsf-experts-ma.mylunch.space')).toEqual('vsf-experts-ma')
    })
    it('should parse valid subdomains with leading `www` subdomain', () => {
      expect(parseSubdomainFromHost('www.vsf-experts.lunchspace.de')).toEqual('vsf-experts')
      expect(parseSubdomainFromHost('www.vsf-experts.example.com')).toEqual('vsf-experts')
      expect(parseSubdomainFromHost('www.vsf-experts-ma.mylunch.space')).toEqual('vsf-experts-ma')
    })
  })
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
