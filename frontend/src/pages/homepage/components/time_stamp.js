import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  timeStampWithoutJoin: {
    backgroundColor: 'white',
    height: '60pt',
    width: '60pt',
    flexShrink: 0,
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '2%',
    marginBottom: '2%',
    color: '#75a045',
  },
  timeStampWithOneJoin: {
    height: '80pt',
    width: '80pt',
  },
  clock: {
    fontSize: 'large',
  },
})

class TimeStamp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joined: false,
    }
    this.changeButton = this.changeButton.bind(this)
  }
  changeButton() {
    this.setState((oldState) => {
      const newState = {
        joined: !oldState.joined,
      }
      return newState
    })
  }

  render() {
    const { timeStamp, classes } = this.props
    const { hour } = timeStamp
    const minute = timeStamp.minute === 0 ? '00' : timeStamp.minute
    const buttonClasses = [classes.timeStampWithoutJoin]
    if (this.state.joined) {
      buttonClasses.push(classes.timeStampWithOneJoin)
    }
    return (
      <Button variant="fab" className={buttonClasses} onClick={this.changeButton}>
        <Typography variant="body1" gutterBottom align="center" className={classes.clock}>
          {hour}:{minute}
        </Typography>
      </Button>
    )
  }
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

export default withStyles(styles)(TimeStamp)
