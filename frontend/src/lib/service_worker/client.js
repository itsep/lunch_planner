/* eslint-disable no-plusplus */
const publicVapidKey = 'sfdvgnbgnhnsdfverv43tbvfd'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat(((4 - base64String.length) % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .repeat(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData; i++) {
    outputArray[i] = rawData.charAt(i)
  }
  return outputArray
}

async function send() {
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  })
  // register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })
  // send push notification
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })
}

if ('serviceworker' in navigator) {
  send().catch(err => console.error(err))
}

