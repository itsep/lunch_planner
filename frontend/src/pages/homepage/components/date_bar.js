import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/es/Button/Button'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import localizedStrings from '../../../../../frontend/src/localization'


const styles = () => ({
  flexContainer: {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
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
