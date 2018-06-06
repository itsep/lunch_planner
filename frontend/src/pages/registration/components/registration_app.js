import React from 'react'
import Registration from './registration'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'

function RegistrationApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar />
      <Registration />
    </CommonAppContainer>
  )
}

export default RegistrationApp
