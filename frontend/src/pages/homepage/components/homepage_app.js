import React, { Component } from 'react'
import HeaderBar from './header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'

class HomepageApp extends Component {
  componentWillMount() {
    if (!document.cookie) {
      window.location = routeLocations.LOGIN
    }
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <LocationList />
      </div>
    )
  }
}

export default HomepageApp
