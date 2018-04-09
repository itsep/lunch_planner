const indexModules = require('../index_modules/index_modules')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const { mockReq, mockRes } = require('sinon-express-mock')

chai.use(sinonChai)
const { expect } = chai

describe('Status and content', () => {
  describe('index_modules', () => {
    describe('index_modules', () => {
      describe('getSlashAll', () => {
        it('Hello World', async () => {
          const request = {}
          const req = mockReq(request)
          const res = mockRes()
          await indexModules.getSlashAll(req, res)
          expect(res.send).to.be.calledWith('Hello World!')
        })
      })
    })
  })
})

