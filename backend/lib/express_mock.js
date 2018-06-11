// Returns a new mock request for use in testing.
const mockReq = (options = {}) => {
  const ret = {}
  return Object.assign(ret, {
    accepts: jest.fn(),
    acceptsCharsets: jest.fn(),
    acceptsEncodings: jest.fn(),
    acceptsLanguages: jest.fn(),
    body: {},
    cookies: {
      get: jest.fn(),
    },
    flash: jest.fn(),
    get: jest.fn(),
    is: jest.fn(),
    headers: {},
    params: {},
    query: {},
    session: {},
    publishClient: {
      publish: jest.fn(),
    },
  }, options)
}

// Returns a new mock response for use in testing.
const mockRes = (options = {}) => {
  let ret = {}
  ret = Object.assign(ret, {
    append: jest.fn(),
    attachement: jest.fn(),
    clearCookie: jest.fn(),
    cookie: jest.fn(),
    download: jest.fn(),
    end: jest.fn(),
    format: {},
    get: jest.fn(),
    headersSent: jest.fn(),
    json: jest.fn(),
    jsonp: jest.fn(),
    links: jest.fn(),
    locals: {},
    location: jest.fn(),
    redirect: jest.fn(),
    render: jest.fn(),
    send: jest.fn(),
    sendFile: jest.fn(),
    sendStatus: jest.fn(),
    set: jest.fn(),
    status: jest.fn(),
    type: jest.fn(),
    vary: jest.fn(),
  }, options)
  ret.status.mockImplementation(() => ret)
  return ret
}

function mockNext() {
  return jest.fn()
}

module.exports = {
  mockReq,
  mockRes,
  mockNext,
}
