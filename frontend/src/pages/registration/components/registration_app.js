import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Registration from './registration'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import localizedStrings from '../../../lib/localization'
import buildings from '../../../assets/illustrations/buildings.svg'


const styles = () => ({
  placeholder: {
    flex: 1,
  },
  buildings: {
    display: 'block',
    maxWidth: '60vmax',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2vw',
  },
  registrationContainer: {
    width: '100%',
  },
})

function RegistrationApp({ classes }) {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.signUp} />
      <div className={classes.registrationContainer}>
        <Registration />
      </div>
      <div className={classes.placeholder} />
      <img src={buildings} className={classes.buildings} alt="" />
    </CommonAppContainer>
  )
}

RegistrationApp.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RegistrationApp)
