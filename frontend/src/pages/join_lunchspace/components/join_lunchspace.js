import React, { Component } from 'react'
import { Dialog, DialogTitle, CircularProgress, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { toLogin } from 'lib/redirect'
import PropTypes from 'prop-types'
import { routeLocations } from '../../../pages/route_locations'
import locStrings from '../../../localization'
import apiFetch from '../../../lib/api_fetch'


const styles = () => ({
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '60vh',
    width: '100vw',
  },
})


class JoinLunchspace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lunchspaceName: 'Test',
      user: {
        firstname: null,
        lastname: null,
      },
      isLoading: false,
      error: null,
    }
    this.handleCloseError = this.handleCloseError.bind(this)
  }

  componentDidMount() {
    const urlString = window.location.href
    const url = new URL(urlString)
    const apiUrlString = `/api${url.pathname}${url.search}`
    this.setState({ isLoading: true }) // eslint-disable-line react/no-did-mount-set-state
    apiFetch(apiUrlString, {
      method: 'GET',
    }).then(({ data }) => {
      this.setState({ lunchspaceName: data.lunchspaceName, user: data.user })
    }).catch((error) => {
      this.setState({ error })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  handleCloseError() {
    this.setState({ error: null })
  }

  render() {
    if (!document.cookie) {
      const token = (new URL(window.location.href)).searchParams.get('token')
      window.location = toLogin(routeLocations.JOIN_LUNCHSPACE, token)
    }
    if (this.state.error) {
      return (
        <Dialog open onClose={this.handleCloseError}>
          <DialogTitle id="alert-dialog-title">
            {this.state.error.toString()}
          </DialogTitle>
        </Dialog>
      )
    }
    if (this.state.isLoading) {
      return (
        <div className={this.props.classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <Paper>
        {locStrings
          .formatString(locStrings.joinLunchspace, { lunchspaceName: this.state.lunchspaceName })}
        <h1>
          {this.state.user.firstname}
          {this.state.user.lastname}
        </h1>
      </Paper>
    )
  }
}

JoinLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JoinLunchspace)
