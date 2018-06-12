
/* eslint-disable no-plusplus */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey = 'BMFsioi1UyuOS_ru-7T4EHBlxaf4L28XviLxK8n4-IAyJZpXXRmsSnmlhrZ3q0N1NkFPN84OxqyCkJ2wvtLngdg';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

async function send() {
  const register = await navigator.serviceWorker.register('/notification-worker.js', {
    scope: '/',
  })
  // register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
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

if ('serviceWorker' in navigator) {
  //send().catch(err => console.error(err))
}

Notification.requestPermission((status) => {
  console.log('Notification permission status:', status)
})
navigator.serviceWorker.getRegistration().then(function(reg) {
  reg.showNotification('Hallo Fabian')
})
navigator.serviceWorker.ready.then(function(reg) {

  reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  }).then(function(sub) {
    console.log(JSON.stringify(sub))
    console.log('Endpoint URL: ', sub.endpoint);
  }).catch(function(e) {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied');
    } else {
      console.error('Unable to subscribe to push', e);
    }
  });
})


