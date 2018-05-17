const { toEventDate, toEventTimeId } = require('./event')

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
      expect(toEventTimeId({hour: 0, minute: 0})).toEqual('00:00:00')
      expect(toEventTimeId({hour: 24, minute: 60})).toEqual('24:60:00')
      expect(toEventTimeId({hour: 9, minute: 9})).toEqual('09:09:00')
      expect(toEventTimeId({hour: 10, minute: 10})).toEqual('10:10:00')
    })
  })
})
