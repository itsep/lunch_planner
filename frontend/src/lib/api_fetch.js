import { toLocalizableError } from 'shared/lib/error'
import { withLunchspaceSubdomain } from './lunchspace_subdomain'
import { redirectToLogin } from './authentication'
import { catchAuthenticationErrorAndRedirect, catchAuthorizationErrorAndRedirect } from './auto_redirect'

const reject = Promise.reject.bind(Promise)
/**
 *
 * @param url
 * @param config {Object}
 * @returns {Promise<{data: any, response: Response}, LocalizableError>}
 */
export default function apiFetch(url, config = {}) {
  const redirectToLoginCallback = config.redirectToLogin || redirectToLogin
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
    return fetch(withLunchspaceSubdomain(url), init).then((response) => {
      // everything okay
      if (response.ok) {
        return response.json().then(data => ({ data, response }))
      }
      // an error occured
      return response.json().then(reject)
    })
  })
    // convert every error to an localizable error
    .catch(errorObject => reject(toLocalizableError(errorObject)))
    // catch authentication errors and redirect to login if needed
    .catch(catchAuthenticationErrorAndRedirect.bind(null, redirectToLoginCallback))
    .catch(catchAuthorizationErrorAndRedirect.bind(null, redirectToLoginCallback))
}
