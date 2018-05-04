import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import HeaderBar from './header_bar'
import LocationList from './location/list'

const styles = () => ({
})

function getState() {
  return {
    lunchspace: {
      name: 'lunchspace-name',
      subdomain: 'test-subdomain/',
    },
    profile: {
      src: 'https://pbs.twimg.com/profile_images/845411989589504000/af0aKVig_400x400.jpg',
      firstName: 'David',
      lastName: 'Nadoba',
    },
    locations: [{
      id: 0,
      name: 'Hello',
      eventIds: [],
    }, {
      id: 1,
      name: 'Hi',
      eventIds: [],
    }],
    joinUpAt: [{
      userId: 0,
      locationID: 0,
      time: '',
      date: '',
    }],
    user: [{
      id: 0,
      src: '',
      firstName: '',
      lastName: '',
    }],
  }
}

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = getState()
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.homepage}>
        <HeaderBar
          classes={styles()}
          src={this.state.profile.src}
          lunchspaceName={this.state.lunchspace.name}
          firstName={this.state.profile.firstName}
          lastName={this.state.profile.lastName}
        />
        <LocationList locations={this.state.locations} />
      </div>
    )
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Homepage)
