import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import UserAvatar from './user_avatar'
import { addUser, deleteUser } from '../actions'
import './participants.scss'

const myUser = {
  userId: 1,
  firstName: 'David',
  lastName: 'Nadoba',
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  addUserAction: (timeStampID, locationID, user) => {
    dispatch(addUser(timeStampID, locationID, user))
  },
  deleteUserAction: (timeStampID, locationID, user) => {
    dispatch(deleteUser(timeStampID, locationID, user))
  },
})

function currentUser(userID) {
  return userID === myUser.userId
}

/*
return string of concatitantion of all classes the timestamp has
 */
function getTimeStampClass(classes, timeStamp) {
  let timeStampClass = classes.timeStamp
  // if he has users in the timestamp, he should get bigger
  if (timeStamp.userIDs.length > 0) {
    timeStampClass = `${timeStampClass} ${classes.timeStampWithJoin}`
  }
  // if current User is in timestamp, it should get green
  timeStamp.userIDs.forEach((userID) => {
    if (currentUser(userID)) timeStampClass = `${timeStampClass} ${classes.timeStampWithUser}`
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
    height: '60pt',
    width: '60pt',
    flexShrink: 0,
  },
  timeStampWithJoin: {
    // transform: 'scale(1.5)',
  },
  timeStampWithUser: {
    backgroundColor: 'green',
  },
  clock: {
    fontSize: 'large',
    fontWeight: 'bolder',
  },
})

function TimeStamp({
  classes, timeStamp, locationID, addUserAction, deleteUserAction,
}) {
  return (
    <div className={`${classes.timeStampDiv} time-stamp participant-count-${timeStamp.participants.length}`}>
      <Button
        variant="fab"
        className={getTimeStampClass(classes, timeStamp)}
        onClick={() => {
          if (!isUserJoined(myUser.userId, timeStamp.userIDs)) {
            addUserAction(timeStamp.id, locationID, myUser)
          } else { deleteUserAction(timeStamp.id, locationID, myUser) }
        }}
      >
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {timeStamp.hour}:
          {timeStamp.minute.toString().length === 2 ?
            timeStamp.minute : `0${timeStamp.minute}`}
        </Typography>
        <div className={`participants participant-count-${timeStamp.participants.length}`}>
          {timeStamp.participants.map(user => <div className="avatar-container"><UserAvatar user={user} /></div>)}
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
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TimeStamp))
