/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import TimeStamp from './time_stamp'
import {  } from '../actions'

/*
no dispatch to props without state to props possible
 */
const mapDispatchToProps = dispatch => ({

})

const styles = () => ({
  wrapper: {
    boxShadow: '0px 5px 10px grey',
    borderRadius: '5px',
    marginTop: '5px',
  },
  container: {
    padding: '2%',
    display: 'flex',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      height: '10px',
      backgroundColor: '#75a045',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'black',
      borderRadius: '10px',
    },
  },
  locationTitle: {
    fontSize: 'large',
    backgroundColor: 'white',
    marginTop: '10pt',
    marginBottom: '2pt',
    marginLeft: '1%',
    borderRadius: '14px',
    borderWidth: '4px',
    borderStyle: 'solid',
    color: '#75a045',
    fontWeight: 'bolder',
    width: '15%',
  },
})

function LocationItem({
  id, name, timeStamps, classes,
}) {
  return (
    <div className={classes.wrapper}>
      <div>
        <Button className={classes.locationTitle} variant="raised">{name}</Button>
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

export default withStyles(styles)(connect(mapDispatchToProps)(LocationItem))
