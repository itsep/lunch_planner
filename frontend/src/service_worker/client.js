import updateSubscription from './update_subscription'

/* eslint-disable no-plusplus */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const vapidPublicKey = 'BMFsioi1UyuOS_ru-7T4EHBlxaf4L28XviLxK8n4-IAyJZpXXRmsSnmlhrZ3q0N1NkFPN84OxqyCkJ2wvtLngdg'
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

async function registerServiceWorker() {
  return navigator.serviceWorker.register('/notification-worker.js')
}

async function subscribe() {
  const register = await navigator.serviceWorker.ready
  // register Push
  return register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  })
}

if ('serviceWorker' in navigator) {
  subscribe().catch(err => console.error(err))
}

function tryToSubscribeWithoutUserInteraction() {
  const permission = Notification.requestPermission
  if (permission === 'granted') {
    return subscribe()
  }
  return Promise.reject(permission)
}

function askForPermissionAndSubscribe() {
  return Notification.requestPermission().then(subscribe)
}
registerServiceWorker()
  .catch(error => console.log(error))
  .then(askForPermissionAndSubscribe)
  .then((newSubscription) => {
    console.log(JSON.parse(JSON.stringify(newSubscription)))
    return updateSubscription({ newSubscription })
  })
  .catch(error => console.error(error))


