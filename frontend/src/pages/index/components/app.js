import React, { Component } from 'react'
import routeLocations from '../../route_locations'

class App extends Component {
  componentWillMount() {
    if (!document.cookie) {
      window.location = routeLocations.LOGIN
    } else {
      window.location = routeLocations.HOMEPAGE
    }
  }
  render() {
    return <div />
  }
}

export default App
