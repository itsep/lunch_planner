import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import HeaderBar from './header_bar'

const styles = {
  title: {
    flex: 1,
  },
}

function UnauthorizedHeaderBar({ classes, title }) {
  return (
    <HeaderBar title={title}>
      <Typography variant="title" color="inherit" className={classes.title}>
        {title}
      </Typography>
    </HeaderBar>
  )
}
UnauthorizedHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default withStyles(styles)(UnauthorizedHeaderBar)
