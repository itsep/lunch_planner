const moment = require('moment')
const { Notification } = require('./notification/notification')

function someoneElseJoinedMyEvent(lunchspace, location, eventTime, joinedUser, totalUserInEvent) {
  console.log(eventTime)
  const eventTimeMoment = moment(eventTime, 'HH:mm:ss')
  console.log(eventTimeMoment)
  const moreUserCount = totalUserInEvent - 2
  const body = (() => {
    switch (totalUserInEvent) {
      case 0:
      case 1:
      case 2:
        return 'someoneElseJoinedMyEventBody'
      case 3:
        return 'someoneElseAndOneOtherJoinedMyEventBody'
      default:
        return 'someoneElseAndMultipleOtherJoinedMyEventBody'
    }
  })()

  return new Notification({
    title: 'someoneElseJoinedMyEventTitle',
    titleValues: {
      joinedUserFirstName: joinedUser.firstName,
      joinedUserLastName: joinedUser.lastName,
      locationName: location.name,
      eventTime: language => eventTimeMoment.locale(language).format('LT'),
    },
    body,
    bodyValues: {
      joinedUserFirstName: joinedUser.firstName,
      joinedUserLastName: joinedUser.lastName,
      locationName: location.name,
      lunchspaceName: lunchspace.name,
      eventTime: language => eventTimeMoment.locale(language).format('LT'),
      moreUserCount,
    },
  })
}

module.exports = {
  someoneElseJoinedMyEvent,
}
