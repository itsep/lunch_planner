import React from 'react'
import Login from './login'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import localizedStrings from '../../../lib/localization'

function LoginApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.login} />
      <Login />
    </CommonAppContainer>
  )
}

export default LoginApp
