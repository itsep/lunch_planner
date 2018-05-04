import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  location: {
  },
})

function LocationItem(props) {
  const { classes } = props
  return (
    <div className={classes.location}>
      {props.key}
      {props.location.name}
    </div>
  )
}

LocationItem.propTypes = {
  key: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(LocationItem)