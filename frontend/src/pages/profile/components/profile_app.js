import React from 'react'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import localizedStrings from '../../../lib/localization'
import Profile from './profile'

function ProfileApp() {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.profile} />
      <Profile />
    </CommonAppContainer>
  )
}

export default ProfileApp
