import React from 'react'
import Login from './login'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'

function LoginApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar />
      <Login />
    </CommonAppContainer>
  )
}

export default LoginApp
