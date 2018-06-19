import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import LocationItem from './location_item'
import CreateLocation from './create_location'
import localizedStrings from '../../../lib/localization'
import food from '../../../assets/illustrations/food.svg'

const mapStateToProps = state => ({
  locationsInLunchspace: state.locationsInLunchspace,
})

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    flex: 1,
  },
  locationList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    flex: '1 1',
  },
  createButtonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLocation: {
    margin: '16px',
  },
  placeholder: {
    flex: '1 1',
  },
  foodImage: {
    display: 'block',
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
      <div className={classes.container}>
        <CreateLocation
          show={this.state.showLocation}
          onClose={() => {
            this.setState({ showLocation: false })
          }}
        />
        <div className={classes.locationList}>
          {locationsInLunchspace.map((locationId => (
            <LocationItem
              key={locationId}
              id={locationId}
            />
           )))}
          <div>
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
          </div>
          <div className={classes.placeholder} />
          <div>
            <img
              src={food}
              alt=""
              className={classes.foodImage}
            />
          </div>
        </div>
      </div>
    )
  }
}

LocationList.propTypes = {
  locationsInLunchspace: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(LocationList))
