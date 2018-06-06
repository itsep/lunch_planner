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
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

function toEventDateFromString(dateString) {
  const dateParts = dateString
    .split('-')
    .map(datePart => parseInt(datePart, 10))
  return {
    year: dateParts[0],
    month: dateParts[1],
    day: dateParts[2],
  }
}

module.exports = {
  toEventTimeId,
  toEventDateId,
  toEventDate,
  toEventDateFromString,
}
