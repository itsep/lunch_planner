import React from 'react'
import Registration from './registration'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import localizedStrings from '../../../lib/localization'

function RegistrationApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.signUp} />
      <Registration />
    </CommonAppContainer>
  )
}

export default RegistrationApp
