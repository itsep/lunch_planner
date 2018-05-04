import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '400px',
    padding: theme.spacing.unit * 2,
  },

})

function FormSection(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  )
}

FormSection.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

export default withStyles(styles)(FormSection)
