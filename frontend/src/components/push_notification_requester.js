import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import localizedStrings from 'lib/localization'

function PushNotificationRequester({ shouldAsk, askLater, requestPermission }) {
  return (
    <Snackbar
      open={shouldAsk}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      message={localizedStrings.askForPushNotificatoinSubscription}
      action={[
        <Button
          onClick={askLater}
          color="inherit"
          size="small"
        >
          {localizedStrings.notNow}
        </Button>,
        <Button
          onClick={requestPermission}
          color="primary"
          variant="contained"
        >
          {localizedStrings.yes}
        </Button>,
      ]}
    />
  )
}
PushNotificationRequester.propTypes = {
  shouldAsk: PropTypes.bool.isRequired,
  askLater: PropTypes.func.isRequired,
  requestPermission: PropTypes.func.isRequired,
}

export default PushNotificationRequester
