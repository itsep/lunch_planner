import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import LocationItem from './location'
import { addLocation } from '../actions'

const mapStateToProps = state => ({
  locations: state.locations,
})

const mapDispatchToProps = dispatch => ({
  addLocationAction: (name, id) => {
    dispatch(addLocation(name, id))
  },
})

const styles = () => ({
  locationList: {
    marginTop: '5pt',
    height: '100pt',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    zIndex: 0,
  },
  buttonLocation: {
    fontSize: 'medium',
    marginTop: '10pt',
    borderRadius: '8px',
    borderStyle: 'solid',
    marginLeft: '46%',
    color: '#75a045',
    fontWeight: 'bolder',
    borderWidth: '4px',
    backgroundColor: 'white',
  },
})

function LocationList({ locations, classes }) {
  return (
    <div>
      <ul className={classes.locationList}>
        {locations.map((location => (
          <li key={location.id}>
            <LocationItem id={location.id} name={location.name} timeStamps={location.timeStamps} />
          </li>
          )))}
        <li>
          <Button
            className={classes.buttonLocation}
          >
          create location
          </Button>
        </li>
      </ul>
    </div>
  )
}

/*
  in button to create new Event
  onClick={() => addLocationAction(newLocationName, newLocationID)}
  */

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationList))
