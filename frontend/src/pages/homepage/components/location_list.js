import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LocationItem from './location_item'

const mapStateToProps = state => ({
  locations: state.locations,
})

function LocationList({ locations }) {
  return (
    <div>
      <ul>
        {locations.map((location => (
          <li key={location.id}>
            <LocationItem id={location.id} name={location.name} />
          </li>
        )))}
      </ul>
    </div>
  )
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

export default connect(mapStateToProps)(LocationList)
