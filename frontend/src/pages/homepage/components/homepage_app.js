import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import DateBar from './date_bar'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import { closeEventDialog, fetchLogout } from '../actions'
import { withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import EventDetailsDialog from './event_details_dialog'

const noParticipants = []
const noSelectedEvent = {}

const mapStateToProps = (state) => {
  let selectedEvent = noSelectedEvent
  if (state.selectedEvent) {
    const { locationId, eventTimeId, show } = state.selectedEvent
    selectedEvent = {
      participantIds: state.locations[locationId].participantsAtTimestamp[eventTimeId] ||
      noParticipants,
      show,
    }
  }
  return {
    user: state.user,
    lunchspace: state.lunchspace,
    show: false,
    participantIds: noParticipants,
    ...selectedEvent,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLogoutAction: () => {
    dispatch(fetchLogout())
  },
  closeDialog: () => {
    dispatch(closeEventDialog())
  },
})

const styles = () => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
})

class HomepageApp extends Component {
  noLunchspaceChoosen() {
    return JSON.stringify(this.props.lunchspace) === JSON.stringify({})
  }
  render() {
    const {
      user, lunchspace, fetchLogoutAction, participantIds, show, closeDialog, classes,
    } = this.props
    if (isDefinitelyNotAuthenticated()) {
      window.location = withLunchspaceSubdomain(routeLocations.LOGIN)
    }
    if (this.noLunchspaceChoosen()) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress size="72px" />
        </div>
      )
    }
    return (
      <CommonAppContainer>
        <AuthorizedHeaderBar title={lunchspace.name || ''} user={user} logout={fetchLogoutAction} />
        <DateBar />
        <LocationList />
        <EventDetailsDialog participantIds={participantIds} show={show} onClose={closeDialog} />
      </CommonAppContainer>
    )
  }
}

HomepageApp.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  fetchLogoutAction: PropTypes.func.isRequired,
  participantIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  show: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomepageApp))
