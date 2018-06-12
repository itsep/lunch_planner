/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { toEventTimeId, nextEventTimeForDate, eventTimeSteps } from 'shared/lib/event'
import TimeStamp from './time_stamp'
import localizedStrings from '../../../localization'
import { fetchDeleteLocation } from '../actions'

const mapStateToProps = (state, props) => ({
  id: props.id,
  location: state.locations[props.id],
})

const mapDispatchToProps = dispatch => ({
  fetchDeleteLocationAction: (locationId) => {
    dispatch(fetchDeleteLocation(locationId))
  },
})

const styles = theme => ({
  wrapper: {
    marginTop: '5px',
  },
  container: {
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      height: theme.spacing.unit,
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.light,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: theme.palette.primary.dark,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  locationTitle: {
    fontSize: '18px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    borderRadius: '100px',
    borderWidth: '1px',
    borderStyle: 'solid',
    color: theme.palette.primary.dark,
  },
})


const firstTimeStamp = {
  hour: 10,
  minute: 0,
}
/*
creates array with empty timestamps
 */
function defaultTimeStamps() {
  const timeStamps = []
  let timeInHours
  let counter = 0
  for (timeInHours = firstTimeStamp.hour; timeInHours < 18; timeInHours += 0.5) {
    const timeStamp = {
      key: counter,
      hour: Math.floor(timeInHours),
      minute: (timeInHours % 1) * 60,
    }
    timeStamp.id = toEventTimeId(timeStamp)
    timeStamps.push(timeStamp)
    counter += 1
  }
  return timeStamps
}

const timeStamps = defaultTimeStamps()


class LocationItem extends React.Component {
  static currentWidth() {
    if (window.innerWidth >= 960) {
      return this.normalWidth
    }
    return this.smallWidth
  }
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.containerRef = React.createRef()
    this.state = {}
  }
  componentDidMount() {
    this.scrollToCurrentTime()
  }
  scrollToCurrentTime() {
    const currentEventTime = nextEventTimeForDate(new Date())
    const eventTimeStepsNeeded = eventTimeSteps(firstTimeStamp, currentEventTime)
    this.containerRef.current.scrollLeft = LocationItem.currentWidth() * eventTimeStepsNeeded
  }
  openMenu(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose() {
    this.setState({ anchorEl: null })
  }
  remove(locationId) {
    this.props.fetchDeleteLocationAction(locationId)
  }
  render() {
    const {
      id, location, classes,
    } = this.props
    const { anchorEl } = this.state
    return (
      <div className={classes.wrapper}>
        <div>
          <Button className={classes.locationTitle} onClick={this.openMenu}>
            {location.name}
          </Button>
        </div>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={() => this.remove(id)}>
            {localizedStrings.delete}
          </MenuItem>
        </Menu>
        <div className={classes.container} ref={this.containerRef}>
          {timeStamps.map(timeStamp => (
            <TimeStamp key={timeStamp.key} locationId={id} timeStamp={timeStamp} />
          ))}
        </div>
      </div>
    )
  }
}

LocationItem.normalWidth = 86 + (22 * 2)
LocationItem.smallWidth = 64 + (14 * 2)

LocationItem.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchDeleteLocationAction: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LocationItem))
