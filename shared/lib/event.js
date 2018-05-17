function toEventTimeId(eventTime) {
  const second = '00'
  const minute = eventTime.minute < 10 ? `0${eventTime.minute}` : `${eventTime.minute}`
  const hour = eventTime.hour < 10 ? `0${eventTime.hour}` : `${eventTime.hour}`
  return `${hour}:${minute}:${second}`
}

function toEventDate(date) {
  return  {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
}

module.exports = {
  toEventTimeId,
  toEventDate,
}
