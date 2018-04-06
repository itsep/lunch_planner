const indexModules = require('../index_modules/index_modules')
const { expect } = require('chai')
const { mockReq, mockRes } = require('sinon-express-mock')

let request = {}
let req
let res

describe('Status and content', () => {
  describe('index_modules', () => {
    describe('index_modules', () => {
      describe('getSlashAll', () => {
        it('Hello World', async () => {
          request = {}
          req = mockReq(request)
          res = mockRes()
          await indexModules.getSlashAll(req, res)
          expect(res.send.args[0][0]).to.equal('Hello World!')
        })
      })
    })
  })
})

