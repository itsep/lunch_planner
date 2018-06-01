module.exports = {
  setupFiles: [
    './test/setupJest.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/test.js',
  ],
  collectCoverage: false,
  coverageDirectory: './__coverage__',
  coverageReporters: [
    'json',
    'lcov',
    'text',
  ],
}
