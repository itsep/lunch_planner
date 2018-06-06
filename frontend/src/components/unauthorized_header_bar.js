import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import routeLocations from '../pages/route_locations'
import localizedStrings from '../localization'

const styles = {
  title: {
    flex: 1,
  },
}

function UnauthorizedHeaderBar({ classes }) {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          {localizedStrings.productName}
        </Typography>
        <Button
          color="inherit"
          href={routeLocations.LOGIN}
        >
          {localizedStrings.login}
        </Button>
        <Button
          color="inherit"
          href={routeLocations.REGISTRATION}
        >
          {localizedStrings.signUp}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
UnauthorizedHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UnauthorizedHeaderBar)
