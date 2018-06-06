/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Typography } from 'material-ui'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toEventTimeId } from 'shared/lib/event'
import TimeStamp from './time_stamp'

const mapStateToProps = (state, props) => ({
  id: props.id,
  location: state.locations[props.id],
})

const mapDispatchToProps = dispatch => ({
})

const styles = theme => ({
  wrapper: {
    marginTop: '5px',
  },
  container: {
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      height: theme.spacing.unit,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.light,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: theme.palette.primary.dark,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  locationTitle: {
    fontSize: '18px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    borderRadius: '100px',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: theme.palette.primary.dark,
  },
})

/*
creates array with empty timestamps
 */
function defaultTimeStamps() {
  const timeStamps = []
  let timeInHours
  let counter = 0
  for (timeInHours = 10; timeInHours < 18; timeInHours += 0.5) {
    const timeStamp = {
      key: counter,
      hour: Math.floor(timeInHours),
      minute: (timeInHours % 1) * 60,
    }
    timeStamp.id = toEventTimeId(timeStamp)
    timeStamps.push(timeStamp)
    counter += 1
  }
  return timeStamps
}

const timeStamps = defaultTimeStamps()

function LocationItem({
  id, location, classes,
}) {
  return (
    <div className={classes.wrapper}>
      <div>
        <Button className={classes.locationTitle}>{location.name}</Button>
      </div>
      <div className={classes.container}>
        {timeStamps.map(timeStamp => (
          <TimeStamp key={timeStamp.key} locationId={id} timeStamp={timeStamp} />
      ))}
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationItem))
