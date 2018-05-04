import React from 'react'
import PropTypes from 'prop-types'


function LocationItem({ id, name }) {
  return (
    <div>
      {id}
      {name}
    </div>
  )
}

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default LocationItem
