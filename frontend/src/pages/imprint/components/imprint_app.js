import React, { Component } from 'react'
import Imprint from './imprint'
import localizedStrings from '../../../lib/localization'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'

class ImprintApp extends Component {
  render() {
    return (
      <CommonAppContainer>
        <UnauthorizedHeaderBar title={localizedStrings.imprint} />
        <Imprint />
      </CommonAppContainer>
    )
  }
}

export default ImprintApp
