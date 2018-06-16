function timeForSQL(time) {
  const eventTimeHour = time.hour
  const eventTimeMinute = time.minute.toString().length === 2 ? time.minute : `0${time.minute}`
  return `${eventTimeHour}:${eventTimeMinute}:00`
}

function dateForSQL(date) {
  const eventDateYear = date.year.toString()
  const eventDateMonth = date.month.toString().length === 2 ? date.month : `0${date.month}`
  const eventDateDay = date.day.toString().length === 2 ? date.day : `0${date.day}`
  return `${eventDateYear}-${eventDateMonth}-${eventDateDay}`
}

module.exports = {
  timeForSQL,
  dateForSQL,
}
