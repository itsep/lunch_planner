import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { headerBarClassName } from '../lib/ios_native'
import logo from '../assets/logo/logo-with-burger.svg'
import routeLocations from '../pages/route_locations'

const styles = theme => ({
  toolbar: {
    paddingLeft: 0,
  },
  logo: {
    height: 46,
    width: 70 - (theme.spacing.unit * 2),
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      height: 56,
      width: 98 - (theme.spacing.unit * 2 * 2),
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
})

function UnauthorizedHeaderBar({ classes, title, children }) {
  document.title = title
  return (
    <AppBar
      position="static"
      color="default"
      className={headerBarClassName}
    >
      <Toolbar className={classes.toolbar}>
        <a href={routeLocations.HOMEPAGE}>
          <img src={logo} className={classes.logo} alt="" />
        </a>
        {children}
      </Toolbar>
    </AppBar>
  )
}
UnauthorizedHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default withStyles(styles)(UnauthorizedHeaderBar)
