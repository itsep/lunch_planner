import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { addUser, deleteUser } from '../actions'

const PREV_USER_ID = 0

// allway need mapstate to props, maybe some kind of default mapstate?
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
  addUserAction: (timeStampID, locationID, userID) => {
    dispatch(addUser(timeStampID, locationID, userID))
  },
  deleteUserAction: (timeStampID, locationID, userID) => {
    dispatch(deleteUser(timeStampID, locationID, userID))
  },
})

function currentUser(userID) {
  return userID === PREV_USER_ID
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
    marginLeft: '1%',
    marginRight: '1%',
  },
  timeStamp: {
    backgroundColor: 'white',
    height: '60pt',
    width: '60pt',
    flexShrink: 0,
  },
  timeStampWithJoin: {
    transform: 'scale(1.5)',
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
    <div className={classes.timeStampDiv}>
      <Button
        variant="fab"
        className={getTimeStampClass(classes, timeStamp)}
        onClick={() => {
          if (!isUserJoined(PREV_USER_ID, timeStamp.userIDs)) {
            addUserAction(timeStamp.id, locationID, PREV_USER_ID)
          } else { deleteUserAction(timeStamp.id, locationID, PREV_USER_ID) }
        }}
      >
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {timeStamp.hour}:
          {timeStamp.minute.toString().length === 2 ?
            timeStamp.minute : `0${timeStamp.minute}`}
        </Typography>
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
