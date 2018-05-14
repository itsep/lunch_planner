/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Typography } from 'material-ui'
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
    display: 'flex',
    overflowY: 'auto',
  },
  locationTitle: {
    backgroundColor: 'white',
    marginTop: '10pt',
    marginBottom: '5pt',
    marginLeft: '1%',
    borderRadius: '20%',
    borderWidth: '4px',
    borderStyle: 'solid',
    color: '#75a045',
    fontWeight: 'bolder',
  },
})

function LocationItem({ id, name, classes }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.locationTitleDiv}>
        <Button className={classes.locationTitle} variant="raised">Dean & David</Button>
      </div>
      <div className={classes.container}>
        {timeStamps.map(timeStamp => (
          <TimeStamp key={timeStamp.key} timeStamp={timeStamp} />
      ))}
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LocationItem)
