import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { headerBarClassName } from '../lib/ios_native'

const styles = {
  title: {
    flex: 1,
  },
}

function UnauthorizedHeaderBar({ classes, title }) {
  document.title = title
  return (
    <AppBar position="static" color="default" className={headerBarClassName}>
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
UnauthorizedHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default withStyles(styles)(UnauthorizedHeaderBar)
