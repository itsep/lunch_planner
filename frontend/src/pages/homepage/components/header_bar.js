import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Avatar, Typography, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#75a045',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 9,
  },
  logo: {
    backgroundColor: 'grey',
    color: 'black',
    marginLeft: '5%',
  },
  lunchspace: {
    testAlign: 'center',
    color: 'black',
  },
  user: {
    display: 'flex',
    flexShrink: 0,
    marginRight: '5%',
  },
  avatar: {
    height: '40pt',
    width: '40pt',
  },
  profileButton: {
    color: 'black',
    marginRight: '10%',
    height: '50pt',
    width: '30pt',
    borderRadius: '50%',
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
          <Button className={classes.logo} variant="raised">
            LOGO VSF
          </Button>
          <Typography className={classes.lunchspace} variant="title" color="inherit">
            {lunchspace.name}
            <br />
            VSF Experts GmbH
          </Typography>
          <div className={classes.user}>
            <Button className={classes.profileButton} >
              <Avatar alt="David Nadoba" className={classes.avatar} src={profile.src} />
            </Button>
          </div>
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
