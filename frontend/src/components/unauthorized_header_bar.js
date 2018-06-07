import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import localizedStrings from '../localization'
import { toLogin, toRegistration } from '../lib/redirect'

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
          href={toLogin()}
        >
          {localizedStrings.login}
        </Button>
        <Button
          color="inherit"
          href={toRegistration()}
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
