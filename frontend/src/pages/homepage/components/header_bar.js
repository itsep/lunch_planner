import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Avatar, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 9,
    boxShadow: '0px 5px 10px grey',
  },
  logo: {
    backgroundColor: 'white',
    color: '#75a045',
    marginLeft: '0%',
    fontWeight: 'bolder',
    height: '11%',
    width: '11%',
  },
  lunchspace: {
    height: '5%',
    width: '5%',
    fontWeight: 'bold',
    testAlign: 'center',
    backgroundColor: '#75a045',
    color: 'white',
    marginRight: '8%',
  },
  avatar: {
    marginRight: '3%',
    height: '3.5%',
    width: '3.5%',
  },
})

const mapStateToProps = state => ({
  profile: state.profile,
  lunchspace: state.lunchspace,
})

function HeaderBar({ classes, profile, lunchspace }) {
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="default">
        <Toolbar className={classes.flexContainer}>
          <img className={classes.logo} alt="Daniel" src="http://vsf-experts.de/images/neu_vsf_logo_convert.png?crc=3930813411" />
          <div className={classes.lunchspace}>
            <Button className={classes.lunchspace} variant="raised">
              {lunchspace.name}
            </Button>
          </div>
          <Avatar alt="David Nadoba" className={classes.avatar} src={profile.src} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

HeaderBar.propTypes = {
  profile: PropTypes.shape({
    src: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  lunchspace: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subdomain: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(HeaderBar))
