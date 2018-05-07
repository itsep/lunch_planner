const { validLength, validEmail } = require('../../lib/validation')

const minimumLength = 1
const maximumLength = 24

const testName1 = 'gültiger Name'
const testName2 = '              gültiger Name            '
const testName3 = 'viel zu langer und deshalb ungültiger Name'
const testName4 = ''
const testName5 = null
const testName6 = 13

const testEmail1 = 'max.mustermann@t-online.de'
const testEmail2 = '123.abc.äöü@me.tv'
const testEmail3 = 'fürdendrittentesteinescheinbargültigemailaddressedieabervielzulangfürdiedatenbankistalsomehrals120zeichenhat121@gmail.com'
const testEmail4 = ''
const testEmail5 = null
const testEmail6 = 13
const testEmail7 = 'max.mustermann@@gmail.com'
const testEmail8 = 'max.mustermann@gmail.a'
const testEmail9 = 'max..mustermann@gmail.com'


describe('validation', () => {
  describe('validLength', async () => {
    it('should return true', () => {
      expect(validLength(testName1, maximumLength, minimumLength)).toEqual(true)
    })
    it('should return true', () => {
      expect(validLength(testName2, maximumLength, minimumLength)).toEqual(true)
    })
    it('should return false (too long)', () => {
      expect(validLength(testName3, maximumLength, minimumLength)).toEqual(false)
    })
    it('should return false (too short)', () => {
      expect(validLength(testName4, maximumLength, minimumLength)).toEqual(false)
    })
    it('should return false (null)', () => {
      expect(validLength(testName5, maximumLength, minimumLength)).toEqual(false)
    })
    it('should return false (not a String)', () => {
      expect(validLength(testName6, maximumLength, minimumLength)).toEqual(false)
    })
  })
  describe('validEmail', async () => {
    it('should return true', () => {
      expect(validEmail(testEmail1)).toEqual(true)
    })
    it('should return true', () => {
      expect(validEmail(testEmail2)).toEqual(true)
    })
    it('should return false (too long)', () => {
      expect(validEmail(testEmail3)).toEqual(false)
    })
    it('should return false (too short)', () => {
      expect(validEmail(testEmail4)).toEqual(false)
    })
    it('should return false (null)', () => {
      expect(validEmail(testEmail5)).toEqual(false)
    })
    it('should return false (not a String)', () => {
      expect(validEmail(testEmail6)).toEqual(false)
    })
    it('should return false (double @)', () => {
      expect(validEmail(testEmail7)).toEqual(false)
    })
    it('should return false (.a)', () => {
      expect(validEmail(testEmail8)).toEqual(false)
    })
    it('should return false (double .)', () => {
      expect(validEmail(testEmail9)).toEqual(false)
    })
  })
})
