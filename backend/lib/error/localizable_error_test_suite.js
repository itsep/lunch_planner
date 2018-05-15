/**
 * This module contains a test suite/functions that each localizable error should pass
 */

/**
 *
 * @param {LocalizableError} error
 */
function testResponse(error) {
  expect(error).toBeDefined()
  const response = error.toResponse()
  expect(response).toBeDefined()
  expect(response.name).toEqual(expect.any(String))
  expect(response.localisationKey).toEqual(expect.any(String))
}

/**
 * Function to joinEvent a new `LocalizableError`
 *
 * @callback createLocalizableError
 * @async
 * @returns {LocalizableError} error
 */

/**
 *
 * @param {createLocalizableError} createLocalizableError
 */
function addAllLocalizableErrorTestsToCurrentSuite(createLocalizableError) {
  it('should joinEvent a valid response object', async () => {
    const error = await createLocalizableError()
    testResponse(error)
  })
}

module.exports = {
  testResponse,
  addAllLocalizableErrorTestsToCurrentSuite,
}
