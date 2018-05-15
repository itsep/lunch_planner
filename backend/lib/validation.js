function validLength(param, maximumLength, minimumLength) {
  let paramCut = param
  if (typeof param === 'string') {
    paramCut = param.trim()
  } else {
    return false
  }
  if (paramCut.length > maximumLength) {
    return false
  }
  if (paramCut.length < minimumLength) {
    return false
  }
  return true
}
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
function validEmail(email) {
  return (validLength(email, 120, 5) && re.test(email))
}

function isNumber(potentialNumber) {
  return typeof potentialNumber === 'number'
}

function isBetween(number, min, max) {
  return (number <= max && number >= min)
}

function validTime(time) {
  return (time.hour !== undefined && time.minute !== undefined
    && isNumber(time.hour) && isNumber(time.minute)
  && isBetween(time.hour, 0, 23) && isBetween(time.minute, 0, 59))
}

function validDate(date) {
  return (date.year && date.month && date.day
    && isNumber(date.year) && isNumber(date.month) && isNumber(date.day)
  && isBetween(date.year, 2000, 9999) && isBetween(date.month, 1, 12) && isBetween(date.day, 1, 31))
}

module.exports = {
  validTime,
  validDate,
  validLength,
  validEmail,
}
