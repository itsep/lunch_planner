import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { toEventDate } from 'shared/lib/event'
import UserAvatar from './user_avatar'
import { joinEvent, leaveEvent } from '../actions'
import './participants.scss'

function participantFrom(user) {
  return {
    ...user,
    userId: user.id,
  }
}

const mapStateToProps = state => ({ user: state.user, currentDate: state.currentDate })

const mapDispatchToProps = dispatch => ({
  addUserAction: (timeStampID, locationID, eventTime, eventDate, user) => {
    dispatch(joinEvent(
      'vsf-experts-ma',
      locationID,
      eventTime,
      eventDate,
      participantFrom(user)
    ))
  },
  deleteUserAction: (timeStampID, locationID, eventTime, eventDate, user) => {
    dispatch(leaveEvent(
      'vsf-experts-ma',
      locationID,
      eventTime,
      eventDate,
      participantFrom(user)
    ))
  },
})

/*
return string of concatitantion of all classes the timestamp has
 */
function getTimeStampClass(classes, timeStamp, user) {
  let timeStampClass = classes.timeStamp
  // if he has users in the timestamp, he should get bigger
  if (timeStamp.userIDs.length > 0) {
    timeStampClass = `${timeStampClass} ${classes.timeStampWithJoin}`
  }
  // if current User is in timestamp, it should get green
  timeStamp.userIDs.forEach((userID) => {
    if (userID === user.id) timeStampClass = `${timeStampClass} ${classes.timeStampWithUser}`
  })
  return timeStampClass
}

// is current userID in the array of users
function isUserJoined(userID, userIDs) {
  return userIDs.indexOf(userID) !== -1
}

const styles = () => ({
  timeStampDiv: {
    margin: '24px 16px',
  },
  timeStamp: {
    backgroundColor: 'white',
    height: '80px',
    width: '80px',
    flexShrink: 0,
    transition: '400ms border-color',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: 'transparent',
  },
  timeStampWithUser: {
    borderColor: '#75A045',
  },
  clock: {
    fontSize: 'large',
    fontWeight: 'bolder',
  },
})

function TimeStamp({
  classes, timeStamp, locationID, addUserAction, deleteUserAction, user, currentDate,
}) {
  return (
    <div className={`${classes.timeStampDiv} time-stamp participant-count-${timeStamp.participants.length}`}>
      <Button
        variant="fab"
        className={getTimeStampClass(classes, timeStamp, user)}
        onClick={() => {
          if (!isUserJoined(user.id, timeStamp.userIDs)) {
            addUserAction(
              timeStamp.id,
              locationID,
              { hour: timeStamp.hour, minute: timeStamp.minute },
              toEventDate(currentDate),
              user
            )
          } else {
            deleteUserAction(
              timeStamp.id,
              locationID,
              { hour: timeStamp.hour, minute: timeStamp.minute },
              toEventDate(currentDate),
              user
            )
          }
        }}
      >
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {timeStamp.hour}:
          {timeStamp.minute.toString().length === 2 ?
            timeStamp.minute : `0${timeStamp.minute}`}
        </Typography>
        <div className={`participants participant-count-${timeStamp.participants.length}`}>
          {timeStamp.participants.map(participant => <div className="avatar-container" key={participant.userId}><UserAvatar user={participant} /></div>)}
        </div>
      </Button>
    </div>
  )
}

TimeStamp.propTypes = {
  timeStamp: PropTypes.shape({
    key: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    userIDs: PropTypes.array.isRequired,
  }).isRequired,
  locationID: PropTypes.number.isRequired,
  deleteUserAction: PropTypes.func.isRequired,
  addUserAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  currentDate: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TimeStamp))
