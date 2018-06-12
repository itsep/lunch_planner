const {
  toEventDate, toEventTimeId, toEventDateId, nextEventTimeForDate, eventTimeSteps,
} = require('./event')

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
  describe('nextEventTimeForDate', () => {
    it('should calculate the correct next time', () => {
      expect(nextEventTimeForDate(new Date('2018.01.01 13:00:00'))).toEqual({ hour: 13, minute: 0 })
      expect(nextEventTimeForDate(new Date('2018.01.01 13:30:00'))).toEqual({ hour: 13, minute: 30 })
      expect(nextEventTimeForDate(new Date('2018.01.01 13:29:00'))).toEqual({ hour: 13, minute: 30 })
      expect(nextEventTimeForDate(new Date('2018.01.01 13:01:00'))).toEqual({ hour: 13, minute: 30 })
      expect(nextEventTimeForDate(new Date('2018.01.01 13:31:00'))).toEqual({ hour: 14, minute: 0 })
      expect(nextEventTimeForDate(new Date('2018.01.01 13:59:00'))).toEqual({ hour: 14, minute: 0 })
      expect(nextEventTimeForDate(new Date('2018.01.01 14:00:00'))).toEqual({ hour: 14, minute: 0 })
    })
  })
  describe('eventTimeSteps', () => {
    it('should calculate the correct results', () => {
      expect(eventTimeSteps({ hour: 13, minute: 0 }, { hour: 13, minute: 0 })).toEqual(0)
      // eslint-disable-next-line max-len
      expect(eventTimeSteps({ hour: 0, minute: 0 }, { hour: 13, minute: 30 })).toEqual((13 * 2) + 1)
      expect(eventTimeSteps({ hour: 0, minute: 0 }, { hour: 24, minute: 0 })).toEqual(24 * 2)
      expect(eventTimeSteps({ hour: 14, minute: 0 }, { hour: 13, minute: 30 })).toEqual(-1)
      // eslint-disable-next-line max-len
      expect(eventTimeSteps({ hour: 20, minute: 0 }, { hour: 10, minute: 30 })).toEqual((-10 * 2) + 1)
    })
  })
})
