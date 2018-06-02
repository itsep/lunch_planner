const { toEventDate, toEventTimeId, toEventDateId } = require('./event')

describe('event', () => {
  describe('toEventDate', () => {
    it('should create a valid event date', () => {
      expect(toEventDate(new Date(2014, 1, 1))).toMatchObject({
        day: 1,
        month: 2,
        year: 2014,
      })
      expect(toEventDate(new Date(2018, 11, 1))).toMatchObject({
        day: 1,
        month: 12,
        year: 2018,
      })
      expect(toEventDate(new Date(2018, 11, 31))).toMatchObject({
        day: 31,
        month: 12,
        year: 2018,
      })
    })
  })
  describe('toEventTimeId', () => {
    it('should create a valid event time id', () => {
      expect(toEventTimeId({ hour: 0, minute: 0 })).toEqual('00:00:00')
      expect(toEventTimeId({ hour: 24, minute: 60 })).toEqual('24:60:00')
      expect(toEventTimeId({ hour: 9, minute: 9 })).toEqual('09:09:00')
      expect(toEventTimeId({ hour: 10, minute: 10 })).toEqual('10:10:00')
    })
  })
  describe('toEventDateId', () => {
    it('should create a valid event date id', () => {
      expect(toEventDateId({ year: 2018, month: 1, day: 1 })).toEqual('2018-01-01')
      expect(toEventDateId({ year: 2018, month: 9, day: 9 })).toEqual('2018-09-09')
      expect(toEventDateId({ year: 2018, month: 10, day: 10 })).toEqual('2018-10-10')
      expect(toEventDateId({ year: 2018, month: 12, day: 31 })).toEqual('2018-12-31')
    })
  })
})
