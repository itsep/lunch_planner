import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import TripleDot from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import localizedStrings from 'lib/localization'
import PropTypes from 'prop-types'
import { domainForLunchspace, withLunchspaceSubdomain } from 'lib/lunchspace_subdomain'
import routeLocations from '../route_locations'


export default class LunchspaceListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }
  openMenu(event) {
    this.setState({ anchorEl: event.currentTarget })
  }
  closeMenu() {
    this.setState({ anchorEl: null })
  }
  render() {
    const { lunchspace, classes, leaveLunchspace: onLeaveLunchspace } = this.props
    return (
      <ListItem
        key={lunchspace.subdomain}
        role={undefined}
        button
        component="a"
        href={withLunchspaceSubdomain(
          routeLocations.HOMEPAGE,
          lunchspace.subdomain,
          true
        )}
        className={classes.listItem}
      >
        <ListItemText
          primary={lunchspace.name}
          secondary={domainForLunchspace(lunchspace.subdomain)}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments" onClick={this.openMenu}>
            <TripleDot />
          </IconButton>
          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={() => onLeaveLunchspace(lunchspace.subdomain, true)}>
              {localizedStrings.leaveLunchspace}
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

LunchspaceListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  leaveLunchspace: PropTypes.func.isRequired,
}

