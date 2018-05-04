import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  timeStamp: {
    margin: '5pt',
  },
})

// TODO: change Time to our solution of time
function createTimeStamps() {
  const timeStamps = []
  const time = ':'
  let i
  for (i = 21; i < 36; i += 1) {
    const timeStamp = {
      key: i,
      time: Math.round(i / 2) + time + ((i % 2) * 30),
    }
    timeStamps.push(timeStamp)
  }
  return timeStamps
}

const timeStamps = createTimeStamps()

function LocationItem({ id, name, classes }) {
  return (
    <div>
      {id}
      {name}
      {timeStamps.map(timeStamp => (
        <Button variant="fab" key={timeStamp.key} className={classes.timeStamp} >
          <Typography variant="body1" gutterBottom align="center" >
            {timeStamp.time}
          </Typography>
        </Button>
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
