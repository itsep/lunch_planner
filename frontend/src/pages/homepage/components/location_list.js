import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import LocationItem from './location'
import CreateLocation from './create_location'

const mapStateToProps = state => ({
  locations: state.locations,
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
    return (
      <div>
        <CreateLocation
          show={this.state.showLocation}
          onClose={() => {
            this.setState({ showLocation: false })
          }}
        />
        <ul className={this.props.classes.locationList}>
          {this.props.locations.map((location => (
            <li key={location.id}>
              <LocationItem
                id={location.id}
                name={location.name}
                timeStamps={location.timeStamps}
              />
            </li>
           )))}
          <li>
            <div className={this.props.classes.createButtonBox}>
              <Button
                className={this.props.classes.buttonLocation}
                onClick={() => this.setState({ showLocation: true })}
              >
                create location
              </Button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(LocationList))
