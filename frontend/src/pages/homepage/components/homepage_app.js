import React, { Component } from 'react'
import HeaderBar from './header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'

class HomepageApp extends Component {
  componentWillMount() {
    if (!document.cookie) {
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
