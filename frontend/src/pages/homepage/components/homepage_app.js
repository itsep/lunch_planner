import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Share from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import LocationList from './location_list'
import routeLocations from '../../route_locations'
import CommonAppContainer from '../../../components/common_app_container'
import DateBar from './date_bar'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'
import { closeEventDialog, fetchLogout } from '../actions'
import { withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import EventDetailsDialog from './event_details_dialog'
import InviteteToCurrentLunchspace from './invite_to_current_lunchspace'

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
  title: {
    flex: 1,
  },
  sharedButton: {
    fontSize: 16,
    marginRight: 8,
    cursor: 'pointer',
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
    }
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
  render() {
    const {
      classes, user, lunchspace, fetchLogoutAction, participantIds, show, closeDialog,
    } = this.props

    return (
      <CommonAppContainer>
        <AuthorizedHeaderBar title={lunchspace.name || ''} user={user} logout={fetchLogoutAction}>
          <Share className={classes.sharedButton} onClick={this.openInvite} />
          <Typography variant="title" color="inherit" className={classes.title}>
            { lunchspace.name }
          </Typography>
        </AuthorizedHeaderBar>
        <InviteteToCurrentLunchspace
          show={this.state.showInvite}
          onClose={this.closeInvite}
        />
        <DateBar />
        <LocationList />
        <EventDetailsDialog participantIds={participantIds} show={show} onClose={closeDialog} />
      </CommonAppContainer>
    )
  }
}

HomepageApp.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  fetchLogoutAction: PropTypes.func.isRequired,
  participantIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  show: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomepageApp))
