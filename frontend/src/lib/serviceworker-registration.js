import updateSubscription from './update_subscription'
import moment from './localized_moment'

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
    .then(() => navigator.serviceWorker.ready)
}

async function subscribe() {
  return navigator.serviceWorker.ready.then((registration) => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    })
  })
}

async function sendNewSubscriptionToServer(newSubscription) {
  console.log(JSON.parse(JSON.stringify(newSubscription)))
  return updateSubscription({ newSubscription })
}

function tryToSubscribeWithoutUserInteraction() {
  if (Notification.permission === 'granted') {
    console.log("tryToSubscribeWithoutUserInteraction")
    subscribe()
      .then(sendNewSubscriptionToServer)
      .catch(error => console.error(error))
  }
}

function hasProbablySupport() {
  return 'serviceWorker' in navigator && 'Notification' in window
}

function hasProbablySupportAsync() {
  return hasProbablySupport() ? Promise.resolve() : Promise.reject()
}

export default class PushNotificationManager {
  constructor() {
    this.askUserForPermissionWithReason = () => Promise.reject()
    this.localStorageKeyForLastMomentDenied = 'PushNotificationManager.lastMomentDenied'
    this.localStorageKeyForDenyCountInRow = 'PushNotificationManager.denyCountInRow'
    this.hasPushManager = false
  }
  get daysToWaitBeforeAskingAgain() {
    return Math.min(7, this.denyCountInRow)
  }
  get lastMomentDenied() {
    const isoString = localStorage.getItem(this.localStorageKeyForLastMomentDenied)
    if (isoString) {
      return moment(isoString)
    }
    return undefined
  }
  set lastMomentDenied(momentDenied) {
    if (!momentDenied) {
      localStorage.removeItem(this.localStorageKeyForLastMomentDenied)
      return
    }
    localStorage.setItem(this.localStorageKeyForLastMomentDenied, momentDenied.toISOString())
  }
  get denyCountInRow() {
    return parseInt(localStorage.getItem(this.localStorageKeyForDenyCountInRow), 10) || 0
  }
  set denyCountInRow(count) {
    localStorage.setItem(this.localStorageKeyForDenyCountInRow, count)
  }
  start() {
    console.log("start")
    hasProbablySupportAsync()
      .then(registerServiceWorker)
      .then((registration) => {
        this.hasPushManager = !!registration.pushManager
        // if supported and service worker registration seceded try to subscribe without a prompt
        // this is the case if the user already granted permission
        if (this.hasPushManager) {
          return tryToSubscribeWithoutUserInteraction()
        }
      })
      .catch(error => console.error(error))
  }

  hasSupport() {
    return hasProbablySupport() && this.hasPushManager
  }

  hasGrantedForPermission() {
    return hasProbablySupport() && Notification.permission === 'granted'
  }

  canAskForPermission() {
    return hasProbablySupport() && Notification.permission === 'default'
  }

  requestPermissionAndSubscribe() {
    Notification.requestPermission()
      .catch((error) => {
        this.didDeny()
        return Promise.reject(error)
      })
      .then(() => {
        this.didAccept()
        subscribe()
          .then(sendNewSubscriptionToServer)
          .catch(error => console.error(error))
      })
  }

  shouldAskUserNicely() {
    console.log("this.canAskForPermission()", this.canAskForPermission())
    console.log("this.shouldWaitBeforeAskingAgain()", this.shouldWaitBeforeAskingAgain())
    return hasProbablySupport() && this.canAskForPermission() && !this.shouldWaitBeforeAskingAgain()
  }

  askLaterAgain() {
    console.log("askLaterAgain")
    this.lastMomentDenied = moment()
    this.denyCountInRow += 1
  }

  didDeny() {
    this.askLaterAgain()
  }

  didAccept() {
    this.lastMomentDenied = undefined
    this.denyCountInRow = 0
  }

  shouldWaitBeforeAskingAgain() {
    const lastMomentAskAndDenied = this.lastMomentDenied
    console.log("lastMomentAskAndDenied", lastMomentAskAndDenied)
    if (!lastMomentAskAndDenied) {
      return false
    }
    console.log("this.daysToWaitBeforeAskingAgain",this.daysToWaitBeforeAskingAgain)
    return lastMomentAskAndDenied.add(this.daysToWaitBeforeAskingAgain, 'day').isAfter(moment())
  }
}

PushNotificationManager.shared = new PushNotificationManager()

