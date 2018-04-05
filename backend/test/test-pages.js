const { expect } = require('chai')
const request = require('request')

describe('Status and content', () => {
  describe('Main page', () => {
    it('Hello World', (done) => {
      request('http://localhost:8080', (error, response, body) => {
        expect(body).to.equal('Hello World')
        done()
      })
    })
  })
})
