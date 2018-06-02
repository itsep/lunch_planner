function toTwoDigitString(number) {
  return number < 10 ? `0${number}` : `${number}`
}

function toEventTimeId(eventTime) {
  const second = '00'
  const minute = toTwoDigitString(eventTime.minute)
  const hour = toTwoDigitString(eventTime.hour)
  return `${hour}:${minute}:${second}`
}

function toEventDateId(eventDate) {
  const year = eventDate.year.toString()
  const month = toTwoDigitString(eventDate.month)
  const day = toTwoDigitString(eventDate.day)
  return `${year}-${month}-${day}`
}

function toEventDate(date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

module.exports = {
  toEventTimeId,
  toEventDateId,
  toEventDate,
}
