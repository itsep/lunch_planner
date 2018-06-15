import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Share from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import DateBar from './date_bar'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import {
  closeEventDialog,
  fetchLogout,
  askLaterForNotificationPermission,
  requestNotificationPermission,
} from '../actions'
import { withLunchspaceSubdomain, redirectIfNoLunchspaceSelected } from '../../../lib/lunchspace_subdomain'
import EventDetailsDialog from './event_details_dialog'
import InviteteToCurrentLunchspace from './invite_to_current_lunchspace'
import NotificationPermissionRequester from '../../../lib/serviceworker-registration'
import PushNotificationRequester from '../../../components/push_notification_requester'

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
    shouldAskNicelyForNotificationPermission: state.shouldAskNicelyForNotificationPermission,
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
  askLaterForNotificationPermissionAction: () => {
    dispatch(askLaterForNotificationPermission())
  },
  requestNotificationPermissionAction: () => {
    dispatch(requestNotificationPermission())
  },
})

const styles = () => ({
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  sharedButton: {
    flex: 1,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
})

class HomepageApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInvite: false,
    }
    this.openInvite = this.openInvite.bind(this)
    this.closeInvite = this.closeInvite.bind(this)
  }
  componentDidMount() {
    if (isDefinitelyNotAuthenticated()) {
      window.location = withLunchspaceSubdomain(routeLocations.LOGIN)
      return
    }
    if (redirectIfNoLunchspaceSelected()) {
      return
    }
    NotificationPermissionRequester.shared.start()
  }
  openInvite() {
    this.setState({
      showInvite: true,
    })
  }
  closeInvite() {
    this.setState({
      showInvite: false,
    })
  }
  noLunchspaceChoosen() {
    return JSON.stringify(this.props.lunchspace) === JSON.stringify({})
  }
  render() {
    const {
      classes, user, lunchspace, fetchLogoutAction, participantIds, show, closeDialog,
      shouldAskNicelyForNotificationPermission,
      requestNotificationPermissionAction, askLaterForNotificationPermissionAction,
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
        <AuthorizedHeaderBar title={lunchspace.name || ''} user={user} logout={fetchLogoutAction}>
          <Typography variant="title" color="inherit" className={classes.title}>
            { lunchspace.name }
            <IconButton onClick={this.openInvite}>
              <Share className={classes.sharedButton} />
            </IconButton>
          </Typography>
        </AuthorizedHeaderBar>
        <InviteteToCurrentLunchspace
          show={this.state.showInvite}
          onClose={this.closeInvite}
        />
        <DateBar />
        <LocationList />
        <EventDetailsDialog participantIds={participantIds} show={show} onClose={closeDialog} />
        <PushNotificationRequester
          shouldAsk={shouldAskNicelyForNotificationPermission}
          askLater={askLaterForNotificationPermissionAction}
          requestPermission={requestNotificationPermissionAction}
        />
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
  shouldAskNicelyForNotificationPermission: PropTypes.bool.isRequired,
  askLaterForNotificationPermissionAction: PropTypes.func.isRequired,
  requestNotificationPermissionAction: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomepageApp))
