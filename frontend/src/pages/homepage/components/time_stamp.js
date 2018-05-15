import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import addLocationAction from './actions'

const mapDispatchToProps = dispatch => ({
  addLocation: () => {
    dispatch(addLocationAction())
  },
})

const styles = () => ({
  timeStampWithoutJoin: {
    backgroundColor: 'white',
    height: '60pt',
    width: '60pt',
    flexShrink: 0,
    marginLeft: '1%',
    marginRight: '1%',
  },
  timeStampWithOneJoin: {
    transform: 'scale(1.3)',
  },
  clock: {
    fontSize: 'large',
    fontWeight: 'bolder',
  },
})

function changeButton() {
  this.setState((oldState) => {
    const newState = {
      joined: !oldState.joined,
    }
    return newState
  })
}

function TimeStamp({ classes, timeStamp }) {
  const {
    timeStampClass,
    hour,
    minute,
    userIDs,
  } = { timeStamp }
  return (
    <div>
      <Button variant="fab" className={timeStampClass} onClick={changeButton}>
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {hour}:{minute}
        </Typography>
      </Button>
      {userIDs.map(userID => <Button>{userID}</Button>)}
    </div>
  )
}

TimeStamp.propTypes = {
  timeStamp: PropTypes.shape({
    key: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    userIDs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired),
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapDispatchToProps)(TimeStamp))
