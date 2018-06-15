import updateSubscription from '../lib/update_subscription'
/* eslint-disable no-restricted-globals */

self.addEventListener('push', (e) => {
  const data = e.data.json()
  const actions = []
  if (data.link) {
    actions.push({
      action: 'link',
      title: 'Detail',
    })
  }
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    actions,
    icon: '',
  }))
})


self.addEventListener('pushsubscriptionchange', (event) => {
  updateSubscription(event).catch((error) => {
    // retry once
    console.error(error)
    console.log('retry update subscription')
    return updateSubscription(event)
  }).catch(error => console.error(error))
})

