import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.values.sm,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.md,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.lg,
    },
  },

})

function MiddleSection(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

MiddleSection.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

export default withStyles(styles)(MiddleSection)
