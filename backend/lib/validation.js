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

function validTime(time) {
  if (!time.hour && !time.minute && !time.hour.isNumber() && !time.minute.isNumber()) {
    return false
  }
  return true
}

function validDate(date) {
  if (!date.year && !date.month && !date.day
    && !date.year.isNumber() && !date.month.isNumber() && !date.year.isNumber()) {
    return false
  }
  return true
}
function timeForSQL(time) {
  const eventTimeHour = time.hour.toString().length === 2 ? time.hour : `0${time.hour}`
  const eventTimeMinute = time.minute.toString().length === 2 ? time.minute : `0${time.minute}`
  return `${eventTimeHour}:${eventTimeMinute}`
}

function dateForSQL(date) {
  const eventDateYear = date.year.toString()
  const eventDateMonth = date.month.toString().length === 2 ? date.month.minute : `0${date.month.minute}`
  const eventDateDay = date.day.toString().length === 2 ? date.day.minute : `0${date.day.minute}`
  return `${eventDateYear}-${eventDateMonth}-${eventDateDay}`
}

module.exports = {
  validTime,
  validDate,
  validLength,
  validEmail,
}
