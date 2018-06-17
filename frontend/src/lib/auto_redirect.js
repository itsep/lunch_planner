import { AuthenticationError, AuthorizationError } from 'shared/lib/error'

const makeNeverResolvingPromise = () => new Promise(() => {})

export function catchAuthenticationErrorAndRedirect(redirect, error) {
  if (error instanceof AuthenticationError) {
    redirect()
    return makeNeverResolvingPromise()
  }
  throw error
}

export function catchAuthorizationErrorAndRedirect(redirect, error) {
  if (error instanceof AuthorizationError) {
    redirect()
    return makeNeverResolvingPromise()
  }
  throw error
}
