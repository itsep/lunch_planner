import React from 'react'
import CreateLunchspace from './create_lunchspace'
import CommonAppContainer from '../../../components/common_app_container'
import localizedStrings from '../../../localization'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'

function CreateLunchspaceApp() {
  return (
    <CommonAppContainer>
      <AuthorizedHeaderBar title={localizedStrings.createLunchspace} user={{}} />
      <CreateLunchspace />
    </CommonAppContainer>
  )
}

export default CreateLunchspaceApp
