module.exports = {
  setupFiles: [
    './test/setupJest.js',
  ],
  collectCoverage: false,
  coverageDirectory: './__coverage__',
  coverageReporters: [
    'json',
    'lcov',
    'text',
  ],
}
