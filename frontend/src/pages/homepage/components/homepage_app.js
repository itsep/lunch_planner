import React, { Component } from 'react'
import HeaderBar from './header_bar'
import LocationList from './location_list'
import { routeLocations } from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'


class HomepageApp extends Component {
  componentDidMount() {
    if (isDefinitelyNotAuthenticated()) {
      window.location = routeLocations.LOGIN
    }
  }

  render() {
    return (
      <CommonAppContainer>
        <HeaderBar />
        <LocationList />
      </CommonAppContainer>
    )
  }
}

export default HomepageApp
