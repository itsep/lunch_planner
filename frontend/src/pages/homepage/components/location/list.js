import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import LocationItem from './item'

const styles = () => ({
  list: {
    display: 'inline-block',
  },
})

function LocationList(props) {
  const { classes } = props
  return (
    <div className={classes.list}>
      <ul>
        {props.locations.map(location => <li><LocationItem location={location} key={1} /></li>)}
      </ul>
    </div>
  )
}

LocationList.propTypes = {
  classes: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
}

export default withStyles(styles)(LocationList)
