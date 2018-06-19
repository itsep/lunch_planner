import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import UserAvatar from './user_avatar'
import localizedStrings from '../lib/localization'
import { logout } from '../lib/authentication'
import routeLocations from '../pages/route_locations'
import HeaderBar from './header_bar'

const styles = theme => ({
  title: {
    flex: 1,
  },
  avatar: {
    width: '48px',
    height: '48px',
  },
  userName: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class AuthorizedHeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.state = {}
  }
  openMenu(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose() {
    this.setState({ anchorEl: null })
  }
  render() {
    const {
      classes, user, logout: onLogout, title, children,
    } = this.props
    const { anchorEl } = this.state
    return (
      <HeaderBar title={title}>
        {
          children
          ||
          <Typography variant="title" color="inherit" className={classes.title}>
            { title }
          </Typography>
        }

        <Hidden xsDown implementation="css">
          <Typography variant="title" color="inherit" className={classes.userName} onClick={this.openMenu}>
            {user.firstName} {user.lastName}
          </Typography>
        </Hidden>

        <IconButton onClick={this.openMenu}>
          <UserAvatar
            user={user}
            className={classes.avatar}
          />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem component="a" href={routeLocations.LUNCHSPACES}>
            {localizedStrings.myLunchspaces}
          </MenuItem>
          <MenuItem component="a" href={routeLocations.PROFILE}>
            {localizedStrings.profile}
          </MenuItem>
          <MenuItem component="a" href={routeLocations.IMPRINT}>
            {localizedStrings.imprint}
          </MenuItem>
          <MenuItem onClick={onLogout}>
            {localizedStrings.logout}
          </MenuItem>
        </Menu>
      </HeaderBar>
    )
  }
}

AuthorizedHeaderBar.defaultProps = {
  children: null,
}
AuthorizedHeaderBar.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func,
}
AuthorizedHeaderBar.defaultProps = {
  logout,
}

export default withStyles(styles)(AuthorizedHeaderBar)
