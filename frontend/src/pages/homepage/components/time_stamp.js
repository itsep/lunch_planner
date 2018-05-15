import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({

})


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
    transform: 'scale(1.3)',
  },
  clock: {
    fontSize: 'large',
    fontWeight: 'bolder',
  },
})

function TimeStamp({ classes, timeStamp }) {
  return (
    <div className={classes.timeStampDiv}>
      <Button variant="fab" className={classes.timeStamp}>
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {timeStamp.hour}:
          {timeStamp.minute.toString().length === 2 ?
            timeStamp.minute : `0${timeStamp.minute}`}
        </Typography>
      </Button>
      {timeStamp.userIDs.map(userID => <Button>{userID}</Button>)}
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
