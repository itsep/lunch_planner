export const headerBarClassName = 'app-header-bar'
const applicationNameForUserAgent = 'lunchspace-ios-native'


export function isRunningOniOS() {
  return window.navigator.userAgent.indexOf(applicationNameForUserAgent) !== -1
}

