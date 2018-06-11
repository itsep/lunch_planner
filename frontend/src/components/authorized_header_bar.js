import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import UserAvatar from './user_avatar'
import localizedStrings from '../localization'
import { logout } from '../lib/authentication'
import { headerBarClassName } from '../lib/ios_native'

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
      classes, user, title, logout: onLogout,
    } = this.props
    document.title = title
    const { anchorEl } = this.state
    return (
      <AppBar position="static" color="default" className={headerBarClassName}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.title}>
            {title}
          </Typography>

          <Hidden xsDown implementation="css">
            <Typography variant="title" color="inherit" className={classes.userName}>
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
            <MenuItem onClick={onLogout}>
              {localizedStrings.logout}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}
AuthorizedHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func,
}
AuthorizedAppBar.defaultProps = {
  logout,
}

export default withStyles(styles)(AuthorizedHeaderBar)
