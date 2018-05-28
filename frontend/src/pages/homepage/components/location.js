/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import TimeStamp from './time_stamp'

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({

})

const styles = () => ({
  wrapper: {
    marginTop: '5px',
  },
  container: {
    padding: '2%',
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '10px',
      background: 'grey',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'grey',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#467117',
    },
    '&::-webkit-scrollbar-track': {
      background: 'black',
    },
  },
  locationTitle: {
    fontSize: 'large',
    marginLeft: '5px',
    borderRadius: '100px',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: '#75a045',
  },
})

function LocationItem({
  id, name, timeStamps, classes,
}) {
  return (
    <div className={classes.wrapper}>
      <div>
        <Button className={classes.locationTitle}>{name}</Button>
      </div>
      <div className={classes.container}>
        {timeStamps.map(timeStamp => (
          <TimeStamp key={timeStamp.key} locationID={id} timeStamp={timeStamp} />
      ))}
      </div>
    </div>
  )
}

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  timeStamps: PropTypes.array.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationItem))
