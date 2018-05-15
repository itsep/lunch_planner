import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import LocationItem from './location'
import addLocationAction from '../actions'

const mapStateToProps = state => ({
  locations: state.locations,
})

const mapDispatchToProps = dispatch => ({
  addLocation: () => {
    dispatch(addLocationAction())
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

function LocationList({ locations, addLocation, classes }) {
  return (
    <div>
      <ul className={classes.locationList}>
        {locations.map((location => (
          <li key={location.id}>
            <LocationItem id={location.id} name={location.name} />
          </li>
          )))}
        <li>
          <Button
            className={classes.buttonLocation}
            onClick={addLocation}
          >
          create location
          </Button>
        </li>
      </ul>
    </div>
  )
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  addLocation: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationList))
