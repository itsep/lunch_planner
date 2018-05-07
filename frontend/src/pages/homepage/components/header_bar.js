import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Avatar, Typography, Button } from 'material-ui'

const mapStateToProps = state => ({
  profile: state.profile,
  lunchspace: state.lunchspace,
})

function HeaderBar({ profile, lunchspace }) {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Avatar
            src={profile.src}
          />
          <Typography color="inherit">
            {profile.firstName}
            {profile.lastName}
          </Typography>
          <Typography variant="title" color="inherit">
            {lunchspace.name}
          </Typography>
          <Button variant="raised" color="secondary">
            logout
          </Button>
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
}

export default connect(mapStateToProps)(HeaderBar)
