import React, { Component } from 'react'
import { Dialog, DialogTitle } from 'material-ui'
import Login from '../../login/components/login'
import locStrings from '../../../localization'
import { routeLocations } from '../../route_locations'
import apiFetch from '../../../lib/api_fetch'
import CommonAppContainer from '../../../components/common_app_container'

class JoinLunchspace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lunchspaceName: 'Test',
      user: {
        firstname: null,
        lastname: null,
      },
      error: null,
      lastError: null,
    }
    this.handleCloseError = this.handleCloseError.bind(this)
  }

  componentDidMount() {
    const urlString = window.location.href
    const url = new URL(urlString)
    const apiUrlString = `/api${url.pathname}${url.search}`
    console.log(apiUrlString)
    apiFetch(apiUrlString, {
      method: 'GET',
    }).then(({ data }) => {
      this.setState({ lunchspaceName: data.lunchspaceName, user: data.user })
    }).catch((error) => {
      this.setState({ error, lastError: error })
    })
  }

  handleCloseError() {
    this.setState({ error: null })
  }

  render() {
    if (!document.cookie) {
      window.location = `${routeLocations.LOGIN}?redirect=${routeLocations.JOIN_LUNCHSPACE}&token=${(new URL(window.location.href)).searchParams.get('token')}`
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
    return (
      <CommonAppContainer>
        <h1>
          {locStrings
            .formatString(locStrings.joinLunchspace, { lunchspaceName: this.state.lunchspaceName })}
        </h1>
        <h1>
          {this.state.user.firstname}
          {this.state.user.lastname}
        </h1>
      </CommonAppContainer>
    )
  }
}

export default JoinLunchspace
