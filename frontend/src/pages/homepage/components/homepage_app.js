import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import DateBar from './date_bar'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import { fetchLogout } from '../actions'

const mapStateToProps = state => ({
  user: state.user,
  lunchspace: state.lunchspace,
})

const mapDispatchToProps = dispatch => ({
  fetchLogoutAction: () => {
    dispatch(fetchLogout())
  },
})


class HomepageApp extends Component {
  componentWillMount() {
    if (isDefinitelyNotAuthenticated()) {
      window.location = routeLocations.LOGIN
    }
  }

  render() {
    const { user, lunchspace, fetchLogoutAction } = this.props
    return (
      <CommonAppContainer>
        <AuthorizedHeaderBar user={user} lunchspace={lunchspace} logout={fetchLogoutAction} />
        <DateBar />
        <LocationList />
      </CommonAppContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageApp)
