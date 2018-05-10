/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import TimeStamp from './time_stamp'

function createTimeStamps() {
  const timeStamps = []
  let timeInHours
  for (timeInHours = 6; timeInHours < 20; timeInHours += 0.5) {
    const timeStamp = {
      key: timeInHours * 2,
      hour: Math.round(timeInHours),
      minute: (timeInHours % 1) * 60,
      userIDs: [],
    }
    timeStamps.push(timeStamp)
  }
  return timeStamps
}

const timeStamps = createTimeStamps()

const styles = () => ({
  container: {
    marginLeft: '13%',
    marginRight: '13%',
    display: 'flex',
    overflowY: 'auto',
  },
  locationName: {
    background: 'url(https://pbs.twimg.com/profile_images/845411989589504000/af0aKVig_400x400.jpg)',
    backgroundColor: '#75a045',
    position: 'absolute',
    height: '80pt',
    width: '80pt',
    borderRadius: '50%',
    marginTop: '15pt',
    marginBottom: '10pt',
    marginRight: '10pt',
    marginLeft: '10pt',
    zIndex: 1,
    color: 'black',
  },
  helper: {
    visibility: 'hidden',
    height: '80pt',
    width: '80pt',
    marginTop: '15pt',
    marginBottom: '10pt',
    marginRight: '10pt',
    marginLeft: '10pt',
  },
})

function LocationItem({ id, name, classes }) {
  return (
    <div className={classes.container}>
      <Button className={classes.locationName} variant="raised">
        hallo {name} {id}
      </Button>
      <div>
        <Avatar className={classes.helper} />
      </div>
      {timeStamps.map(timeStamp => (
        <TimeStamp key={timeStamp.key} timeStamp={timeStamp} />
      ))}
    </div>
  )
}

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LocationItem)
