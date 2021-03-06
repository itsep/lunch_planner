const {
  isValidSubdomainChar,
  isValidSubdomain,
  escapeSubdomain,
  parseSubdomainFromHost,
} = require('./subdomain')

describe('subdomain', () => {
  describe('isValidSubdomainCharacter()', () => {
    it('should accept all letters from a to z', () => {
      const letters = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      ]
      letters.forEach((letter) => {
        expect(isValidSubdomainChar(letter)).toBeTruthy()
      })
    })
    it('should accept all numbers from 0 to 9', () => {
      const numbers = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      ]
      numbers.forEach((number) => {
        expect(isValidSubdomainChar(number)).toBeTruthy()
      })
    })
    it('should accept a hypthe', () => {
      expect(isValidSubdomainChar('-')).toBeTruthy()
    })
  })
  describe('isValidSubdomain()', () => {
    it('should accept all valid test subdomains', () => {
      const validSubdomains = [
        'vsf-experts-ma',
        '0',
        'a',
        '9',
        'z',
        '0a0',
        'a0a',
        'a-a',
      ]
      validSubdomains.forEach((validSubdomain) => {
        expect(isValidSubdomain(validSubdomain)).toBeTruthy()
      })
    })
    it('should reject all invalid test subdomains', () => {
      const invalidSubdomain = [
        'vsf-experts-',
        '-experts-ma',
        '-',
        '-a-',
        '--',
        '@',
        '$',
        '%',
      ]
      invalidSubdomain.forEach((validSubdomain) => {
        expect(isValidSubdomain(validSubdomain)).toBeFalsy()
      })
    })
  })
  describe('escapeSubdomain()', () => {
    it('should return an empty string for falsy values', () => {
      expect(escapeSubdomain(undefined)).toEqual('')
      expect(escapeSubdomain(null)).toEqual('')
      expect(escapeSubdomain('')).toEqual('')
      expect(escapeSubdomain(0)).toEqual('')
    })
    it('should lower all characters', () => {
      expect(escapeSubdomain('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-')).toEqual('abcdefghijklmnopqrstuvwxyz0123456789-')
    })
    it('should escape whitespace in the middle of the text', () => {
      expect(escapeSubdomain('a b')).toEqual('a-b')
      expect(escapeSubdomain('a  b')).toEqual('a--b')
    })
    it('should remove invalid characters', () => {
      expect(escapeSubdomain('!@#$%^&*()_+{}[]|\\<>?,./~`')).toEqual('')
      expect(escapeSubdomain('a!@#$%^&*()_+{}b[]|\\<>?,./~`c')).toEqual('abc')
      expect(escapeSubdomain('a😀😃😄😁😆😅😂🤣☺️😊b😇🙂🙃😉😌😍😘😗😙😚😋c')).toEqual('abc')
    })
    it('should not escape whitespace at the start and end of the text', () => {
      expect(escapeSubdomain(' a ')).toEqual('a')
      expect(escapeSubdomain(' a b ')).toEqual('a-b')
    })
    it('should escape VSF Experts Mannheim correctly', () => {
      expect(escapeSubdomain('VSF Experts Mannheim')).toEqual('vsf-experts-mannheim')
    })
  })
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
})
