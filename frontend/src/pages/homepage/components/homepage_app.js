import React, { Component } from 'react'
import HeaderBar from './header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'


class HomepageApp extends Component {
  componentWillMount() {
    if (isDefinitelyNotAuthenticated()) {
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
