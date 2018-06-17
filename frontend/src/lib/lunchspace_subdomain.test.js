import { domainFromHost } from './lunchspace_subdomain'

describe('lunchspace_subdomain', () => {
  it('should get the subdomain correctly', () => {
    expect(domainFromHost('mylunch.space')).toEqual('mylunch.space')
    expect(domainFromHost('www.mylunch.space')).toEqual('mylunch.space')
    expect(domainFromHost('vsf-experts-ma.mylunch.space')).toEqual('mylunch.space')
    expect(domainFromHost('www.vsf-experts-ma.mylunch.space')).toEqual('mylunch.space')
    expect(domainFromHost('localhost')).toEqual('localhost')
    expect(domainFromHost('davids-macbook-pro.local')).toEqual('davids-macbook-pro.local')
  })
})
