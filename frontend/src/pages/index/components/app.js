import React, { Component } from 'react'
import routeLocations from '../../route_locations'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import redirectTo from '../../../lib/redirectTo'

class App extends Component {
  componentWillMount() {
    if (isDefinitelyNotAuthenticated()) {
      window.location = redirectTo(routeLocations.LOGIN)
    } else {
      window.location = redirectTo(routeLocations.HOMEPAGE)
    }
  }
  render() {
    return <div />
  }
}

export default App
