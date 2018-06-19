import apiFetch from 'lib/api_fetch'

import React from 'react'
import CreateLunchspace from './create_lunchspace'
import CommonAppContainer from '../../../components/common_app_container'
import localizedStrings from '../../../lib/localization'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'


class CreateLunchspaceApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    apiFetch('/api/account', {
      method: 'GET',
    }).then((response) => {
      const { user } = response.data
      this.setState({
        user,
      })
    })
  }
  render() {
    return (
      <CommonAppContainer>
        <AuthorizedHeaderBar
          title={localizedStrings.createLunchspace}
          user={this.state.user || {}}
        />
        <CreateLunchspace />
      </CommonAppContainer>
    )
  }

}

export default CreateLunchspaceApp
