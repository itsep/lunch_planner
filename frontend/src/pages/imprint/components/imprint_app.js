import React from 'react'
import Imprint from './imprint'
import localizedStrings from '../../../lib/localization'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'

function ImprintApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.imprint} />
      <Imprint />
    </CommonAppContainer>
  )
}

export default ImprintApp
