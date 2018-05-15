import React, { Component } from 'react'
import HeaderBar from './header_bar'
import DateBar from './date_bar'
import LocationList from './location_list'

class HomepageApp extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <DateBar />
        <LocationList />
      </div>
    )
  }
}

export default HomepageApp
