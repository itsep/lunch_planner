import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { AppBar, Toolbar, Avatar, Typography, Button } from 'material-ui'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
  },
  title: {
  },
  button: {
    margin: theme.spacing.unit,
  },
})

function HeaderBar(props) {
  const { classes } = props
  function getInitials() {
    return props.firstName.charAt(0) + props.lastName.charAt(0)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Avatar
            src={props.src}
            className={classes.avatar}
          />
          <Typography color="inherit">
            {getInitials()}
          </Typography>
          <Typography variant="title" color="inherit" className={classes.title}>
            {props.lunchspaceName}
          </Typography>
          <Button variant="raised" color="secondary" className={classes.button}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  lunchspaceName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

export default withStyles(styles)(HeaderBar)
