module.exports = {
  setupFiles: [
    './test/setupJest.js',
  ],
  globalSetup: './test/globalSetupJest.js',
  globalTeardown: './test/globalTeardownJest.js',
  collectCoverage: false,
  coverageDirectory: './__coverage__',
  coverageReporters: [
    'json',
    'lcov',
    'text',
  ],
}
