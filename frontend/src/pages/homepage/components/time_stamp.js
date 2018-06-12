import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toEventDateFromMoment } from 'shared/lib/event'
import { joinEvent, leaveEvent, openEventDialog } from '../actions'
import Participant from './participant'

function participantFrom(user) {
  const { id, ...participant } = user
  participant.userId = id
  return participant
}

const noParticipants = []

const mapStateToProps = (state, props) => ({
  user: state.user,
  currentDate: state.currentDate,
  participants: state.locations[props.locationId].participantsAtTimestamp[props.timeStamp.id] ||
  noParticipants,
})

const mapDispatchToProps = dispatch => ({
  addUserAction: (timeStampID, locationId, eventTime, eventDate, user) => {
    dispatch(joinEvent(
      locationId,
      eventTime,
      eventDate,
      participantFrom(user)
    ))
  },
  deleteUserAction: (timeStampID, locationId, eventTime, eventDate, user) => {
    dispatch(leaveEvent(
      locationId,
      eventTime,
      eventDate,
      participantFrom(user)
    ))
  },
  openEventDialogAction: (locationId, eventTimeId, userId) => {
    dispatch(openEventDialog(locationId, eventTimeId, userId))
  },
})

/*
return string of concatitantion of all classes the timestamp has
 */
function getTimeStampClass(classes, participants, user) {
  let timeStampClass = classes.timeStamp
  // if he has users in the timestamp, he should get bigger
  if (participants.length > 0) {
    timeStampClass = `${timeStampClass} ${classes.timeStampWithJoin}`
  }
  // if current User is in timestamp, it should get green
  participants.forEach((userId) => {
    if (userId === user.id) timeStampClass = `${timeStampClass} ${classes.timeStampWithUser}`
  })
  return timeStampClass
}

// is current userID in the array of users
function isUserJoined(userId, participants) {
  return participants.indexOf(userId) !== -1
}

const styles = theme => ({
  timeStampDiv: {
    margin: '48px 14px',
    '&:last-child': {
      // hack to add margin-right to the last element, it does not work because of flexbox
      borderRight: '14px solid transparent',
    },
    [theme.breakpoints.up('md')]: {
      margin: '56px 22px',
    },
  },
  timeStamp: {
    backgroundColor: 'white',
    height: '64px',
    width: '64px',
    flexShrink: 0,
    transition: '400ms border-color',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'transparent',
    [theme.breakpoints.up('md')]: {
      borderWidth: '4px',
      width: '86px',
      height: '86px',
    },
    '@media (hover: none)': {
      '&:hover': {
        backgroundColor: '#FFF',
      },
    },
  },
  timeStampWithUser: {
    borderColor: theme.palette.primary.light,
  },
  clock: {
    fontSize: '20px',
    fontWeight: 'bolder',
    [theme.breakpoints.up('md')]: {
      fontSize: '24px',
    },
    marginBottom: 0,
  },
  showMore: {
    width: '24px',
    height: '24px',
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
      width: '30px',
      height: '30px',
      fontSize: '14px',
    },
    margin: '-50%',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    borderRadius: '100%',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.light,
  },
})

const maxCircleCount = 6

function TimeStamp({
  classes, locationId, timeStamp, participants, addUserAction, deleteUserAction, user, currentDate,
  openEventDialogAction,
}) {
  const showMoreParticipantsButton = participants.length > maxCircleCount
  const participantToDisplay = showMoreParticipantsButton ?
    participants.slice(0, maxCircleCount - 1) : participants
  const circleCount = showMoreParticipantsButton ? maxCircleCount : participantToDisplay.length

  return (
    <div className={`${classes.timeStampDiv} time-stamp participant-count-${circleCount}`}>
      <Button
        variant="fab"
        className={getTimeStampClass(classes, participants, user)}
        onClick={() => {
          if (!isUserJoined(user.id, participants)) {
            addUserAction(
              timeStamp.id,
              locationId,
              { hour: timeStamp.hour, minute: timeStamp.minute },
              toEventDateFromMoment(currentDate),
              user
            )
          } else {
            deleteUserAction(
              timeStamp.id,
              locationId,
              { hour: timeStamp.hour, minute: timeStamp.minute },
              toEventDateFromMoment(currentDate),
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
      </Button>
      <div className={`participants participant-count-${circleCount}`}>
        {participantToDisplay.map(userId => (
          <Participant
            key={userId}
            userId={userId}
            onClick={() => openEventDialogAction(locationId, timeStamp.id, userId)}
          />
        ))}
        {showMoreParticipantsButton &&
        <div className="avatar-container">
          <div
            className={classes.showMore}
            onClick={() => openEventDialogAction(locationId, timeStamp.id)}
          >
            +{participants.length - participantToDisplay.length}
          </div>
        </div>
        }
      </div>
    </div>
  )
}

TimeStamp.propTypes = {
  timeStamp: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
  }).isRequired,
  participants: PropTypes.arrayOf(PropTypes.number).isRequired,
  locationId: PropTypes.number.isRequired,
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
  openEventDialogAction: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TimeStamp))
