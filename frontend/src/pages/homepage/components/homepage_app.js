import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import DateBar from './date_bar'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import { fetchLogout } from '../actions'
import { withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'

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
  componentDidMount() {
    if (isDefinitelyNotAuthenticated()) {
      window.location = withLunchspaceSubdomain(routeLocations.LOGIN)
    }
  }

  render() {
    const { user, lunchspace, fetchLogoutAction } = this.props
    return (
      <CommonAppContainer>
        <AuthorizedHeaderBar title={lunchspace.name || ''} user={user} logout={fetchLogoutAction} />
        <DateBar />
        <LocationList />
      </CommonAppContainer>
    )
  }
}

HomepageApp.propTypes = {
  user: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  fetchLogoutAction: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageApp)
