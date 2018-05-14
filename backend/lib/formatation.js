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
  timeForSQL,
  dateForSQL,
}
