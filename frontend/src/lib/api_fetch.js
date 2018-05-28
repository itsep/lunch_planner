import { toLocalizableError } from 'shared/lib/error'

const reject = Promise.reject.bind(Promise)
/**
 *
 * @param url
 * @param config {Object}
 * @returns {Promise<any, LocalizableError>}
 */
export default function apiFetch(url, config = {}) {
  return Promise.resolve().then(() => {
    const init = Object.assign({}, {
      credentials: 'same-origin',
    }, config)
    init.headers = Object.assign({}, {
      'content-type': 'application/json',
    }, config.headers)

    if (config.body) {
      init.body = JSON.stringify(config.body)
    }
    return fetch(url, init).then((response) => {
      // everthing okay
      if (response.ok) {
        return response.json().then(data => ({ data, response }))
      }
      // an error occured
      return response.json().then(reject)
    })
  })
    // convert every error to an localizable error
    .catch(errorObject => reject(toLocalizableError(errorObject)))
}
