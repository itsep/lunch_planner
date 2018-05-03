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

function MiddleSection() {
  const { classes } = this.props

  return (
    <div className={classes.root}>
      {this.props.children}
    </div>
  )
}

MiddleSection.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.any.isRequired,
}

export default withStyles(styles)(MiddleSection)
