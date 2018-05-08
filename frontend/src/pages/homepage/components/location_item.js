import React from 'react'
import PropTypes from 'prop-types'
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
})

function LocationItem({ id, name, classes }) {
  return (
    <div className={classes.container}>
      {id}
      {name}
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
