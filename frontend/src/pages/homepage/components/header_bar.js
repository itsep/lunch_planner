import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Avatar, Button } from 'material-ui'
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
    backgroundColor: 'black',
    color: 'white',
    marginLeft: '0%',
  },
  lunchspace: {
    fontWeight: 'bold',
    testAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  avatar: {
    marginRight: '3%',
    height: '40pt',
    width: '40pt',
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
