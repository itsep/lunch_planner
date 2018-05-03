require('../lib/promise_polyfill')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
const { expect } = chai

global.expect = expect
global.sinon = sinon
