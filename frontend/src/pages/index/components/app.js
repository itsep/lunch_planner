import React, { Component } from 'react'
import { routeLocations } from '../../route_locations'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'

class App extends Component {
  componentWillMount() {
    if (isDefinitelyNotAuthenticated()) {
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
