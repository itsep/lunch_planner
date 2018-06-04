import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/es/Button/Button'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import localizedStrings from '../../../../../shared/src/localization'


const styles = () => ({
  flexContainer: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    height: '25px',
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexItem: {
    padding: 0,
    margin: 0,
    width: '100%',
    minHeight: 0,
    borderRadius: 0,
    color: 'white',
    fontWeight: 'bolder',
  },
})

const mapStateToProps = state => ({
  profile: state.profile,
  lunchspace: state.lunchspace,
})

function DateBar({ classes }) {
  const nextDay = '>'
  const previosDay = '<'
  return (
    <div>
      <ul className={classes.flexContainer}>
        <Button color="default" className={classes.flexItem}>
          {previosDay}
        </Button>
        <Button color="default" className={classes.flexItem}>
          {localizedStrings.today}
        </Button>
        <Button color="default" className={classes.flexItem}>
          {nextDay}
        </Button>
      </ul>
    </div>
  )
}

DateBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(DateBar))
