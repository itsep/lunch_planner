import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/es/Button/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import localizedStrings from '../../../localization'


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
})

function DateBar({ classes }) {
  return (
    <div className={classes.flexContainer}>
      <Button
        color="default"
        size="large"
        className={classes.button}
      >
        <ArrowBack />
      </Button>
      <Button
        color="primary"
        size="large"
        className={classes.button}
      >
        {localizedStrings.today}
      </Button>
      <Button
        color="default"
        size="large"
        className={classes.button}
      >
        <ArrowForward />
      </Button>
    </div>
  )
}

DateBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(DateBar))
