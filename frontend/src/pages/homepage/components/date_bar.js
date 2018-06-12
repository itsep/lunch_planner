import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/es/Button/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { previousDay, nextDay, resetDateToToday } from '../actions'


const styles = () => ({
  flexContainer: {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    minWidth: 0,
    borderRadius: 0,
  },
})

const mapStateToProps = state => ({
  profile: state.profile,
  lunchspace: state.lunchspace,
  currentDate: state.currentDate,
})

const mapDispatchToProps = dispatch => ({
  previousDayAction: () => dispatch(previousDay()),
  nextDayAction: () => dispatch(nextDay()),
  resetDateToTodayAction: () => dispatch(resetDateToToday()),
})

function DateBar({
  classes, previousDayAction, nextDayAction, currentDate, resetDateToTodayAction,
}) {
  return (
    <div className={classes.flexContainer}>
      <Button
        color="default"
        size="large"
        className={classes.button}
        onClick={previousDayAction}
      >
        <ArrowBack />
      </Button>
      <Button
        color="primary"
        size="large"
        className={classes.button}
        onClick={resetDateToTodayAction}
      >
        {currentDate.calendar()}
      </Button>
      <Button
        color="default"
        size="large"
        className={classes.button}
        onClick={nextDayAction}
      >
        <ArrowForward />
      </Button>
    </div>
  )
}

DateBar.propTypes = {
  classes: PropTypes.object.isRequired,
  previousDayAction: PropTypes.func.isRequired,
  nextDayAction: PropTypes.func.isRequired,
  resetDateToTodayAction: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DateBar))
