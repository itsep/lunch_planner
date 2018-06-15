import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Login from './login'
import CommonAppContainer from '../../../components/common_app_container'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import buildings from '../../../assets/illustrations/buildings.svg'
import localizedStrings from '../../../lib/localization'


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
  loginContainer: {
    width: '100%',
  },
})

function LoginApp({ classes }) {
  return (
    <CommonAppContainer>
      <UnauthorizedHeaderBar title={localizedStrings.login} />
      <div className={classes.loginContainer}>
        <Login />
      </div>
      <div className={classes.placeholder} />
      <img src={buildings} className={classes.buildings} alt="" />
    </CommonAppContainer>
  )
}

LoginApp.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginApp)
