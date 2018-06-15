import apiFetch from './api_fetch'

/**
 *
 * @param data {{oldSubscription: Subscription, newSubscription: Subscription}}
 * @returns {Promise<void>}
 */
export default function updateSubscription(data) {
  return apiFetch('/api/notification/web_subscription', {
    method: 'POST',
    body: data,
  })
}
