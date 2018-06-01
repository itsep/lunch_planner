const Channel = require('./channel')

describe('Channel', () => {
  describe('containsPattern()', () => {
    it('should detect a pattern in these strings', () => {
      const channels = [
        'h?llo',
        '?llo',
        'l?',
        '?',
        'h*llo',
        'h*',
        '*llo',
        '*',
        'h[ae]llo',
        'h[ae]',
        '[ae]llo',
        '[ae]',
        'h[a]llo',
        'h[aeo]llo',
      ]
      channels.forEach((channel) => {
        expect(Channel.containsPattern(channel)).toBeTruthy()
      })
    })
    it('should not detect a pattern in these strings', () => {
      const channels = [
        'hallo',
        'test.channel',
        'sd\\?\\*\\2',
        '\\?',
        'a\\?',
        '\\?b',
        'a\\?b',
        '\\*',
        'a\\*',
        '\\*b',
        'a\\*b',
        '\\[a]',
        'a\\[a]',
        '\\[a]b',
        'a\\[a]b',
      ]
      channels.forEach((channel) => {
        expect(Channel.containsPattern(channel)).toBeFalsy()
      })
    })
  })
  it('should create the correct string representation', () => {
    expect(new Channel(['single channel']).toString('.')).toEqual('single channel')
    expect(new Channel(['prefix', 'suffix']).toString('.')).toEqual('prefix.suffix')
    expect(new Channel(['prefix', 'middle', 'suffix']).toString('.')).toEqual('prefix.middle.suffix')
    expect(new Channel(['prefix', '?', 'suffix']).toString('.')).toEqual('prefix.?.suffix')
    expect(new Channel(['prefix', '*', 'suffix']).toString('.')).toEqual('prefix.*.suffix')
    expect(new Channel(['prefix', 123, 'suffix']).toString('.')).toEqual('prefix.123.suffix')
  })
  it('should create the concat two channels', () => {
    expect(new Channel(['prefix']).concat('suffix').toString('.')).toEqual('prefix.suffix')
    expect(new Channel(['prefix']).concat('middle').concat('suffix').toString('.')).toEqual('prefix.middle.suffix')
  })
  it('should create an new channel from all supported types', () => {
    expect(Channel.from(1)).toBeInstanceOf(Channel)
    expect(Channel.from('string')).toBeInstanceOf(Channel)
    expect(Channel.from(['array', 'of', 'strings'])).toBeInstanceOf(Channel)
    expect(Channel.from(new Channel(['another channel']))).toBeInstanceOf(Channel)
  })
  it('should throw a TypeError for unsported types', () => {
    expect(() => Channel.from(undefined)).toThrowError(TypeError)
    expect(() => Channel.from(false)).toThrowError(TypeError)
    expect(() => Channel.from(true)).toThrowError(TypeError)
    expect(() => Channel.from({})).toThrowError(TypeError)
    expect(() => Channel.from(new Error())).toThrowError(TypeError)
    expect(() => Channel.from([])).toThrowError(TypeError)
    expect(() => Channel.from('')).toThrowError(TypeError)
    expect(() => new Channel('test.channel')).toThrowError(TypeError)
  })
  it('should detect a pattern', () => {
    expect(new Channel(['suffix', '?', 'prefix']).containsPattern()).toBeTruthy()
  })
  it('should not detect a pattern', () => {
    expect(new Channel(['suffix', 'middle', 'prefix']).containsPattern()).toBeFalsy()
  })
})
