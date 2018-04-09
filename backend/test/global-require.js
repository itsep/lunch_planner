const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
const { expect } = chai

global.expect = expect
