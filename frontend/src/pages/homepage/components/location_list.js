import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import LocationItem from './location_item'
import CreateLocation from './create_location'
import localizedStrings from '../../../localization'

const mapStateToProps = state => ({
  locationsInLunchspace: state.locationsInLunchspace,
})

const styles = () => ({
  locationList: {
    marginTop: '5pt',
    height: '100pt',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    zIndex: 0,
  },
  createButtonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLocation: {
    fontSize: 'large',
    marginTop: '10pt',
    marginBottom: '2pt',
    marginLeft: '1%',
    borderRadius: '100px',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: '#75a045',
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
