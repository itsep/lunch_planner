import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import LocationItem from './location_item'
import CreateLocation from './create_location'
import localizedStrings from '../../../lib/localization'

const mapStateToProps = state => ({
  locationsInLunchspace: state.locationsInLunchspace,
})

const styles = () => ({
  locationList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  createButtonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLocation: {
    margin: '10px',
  },
})

class LocationList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLocation: false,
    }
  }

  render() {
    const { locationsInLunchspace, classes } = this.props
    return (
      <div>
        <CreateLocation
          show={this.state.showLocation}
          onClose={() => {
            this.setState({ showLocation: false })
          }}
        />
        <ul className={classes.locationList}>
          {locationsInLunchspace.map((locationId => (
            <li key={locationId}>
              <LocationItem
                id={locationId}
              />
            </li>
           )))}
          <li>
            <div className={classes.createButtonBox}>
              <Button
                className={classes.buttonLocation}
                variant="raised"
                color="primary"
                size="large"
                onClick={() => this.setState({ showLocation: true })}
              >
                {localizedStrings.createLocation}
              </Button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

LocationList.propTypes = {
  locationsInLunchspace: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(LocationList))
