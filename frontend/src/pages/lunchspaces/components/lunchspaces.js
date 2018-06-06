import { escapeSubdomain, isValidSubdomain } from 'shared/lib/subdomain'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import apiFetch from '../../../lib/api_fetch'
import localizedStrings from '../../../localization'

function currentLunchspaceSubdomain() {

}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 360,
  },
  titleBar: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '40px',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  title: {
    flex: 1,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
})

class Lunchspaces extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      user: {},
      lunchspaces: [],
    }
  }
  componentWillMount() {
    this.fetchLunchspaces()
  }
  fetchLunchspaces() {
    apiFetch('/api/lunchspace')
      .then(({ data }) => {
        this.setState({
          user: data.user,
          lunchspaces: data.lunchspaces,
          isLoading: false,
        })
      })
      .catch(console.error.bind(console))
  }

  render() {
    const { classes } = this.props
    const { user, lunchspaces, isLoading } = this.state
    return (
      <div>
        <AuthorizedHeaderBar lunchspace={lunchspaces[0] || {}} user={user} />
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="title" className={classes.titleBar}>
              <div className={classes.title}>
                My Lunchspaces
              </div>
              <Fade
                in={isLoading}
              >
                <CircularProgress />
              </Fade>
            </Typography>
            <Fade in={!isLoading}>
              <List className={classes.list}>
                {lunchspaces.map(lunchspace => (
                  <ListItem
                    key={lunchspace.subdomain}
                    role={undefined}
                    button
                    component="a"
                    href={`//${lunchspace.subdomain}.mylunch.space/homepage.html`}
                    className={classes.listItem}
                  >
                    <ListItemText
                      primary={lunchspace.name}
                      secondary={`${lunchspace.subdomain}.mylunch.space`}
                    />
                    {lunchspace.isAdmin &&
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments">
                          <SettingsIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    }
                  </ListItem>
                ))}
              </List>
            </Fade>
          </div>
        </div>
      </div>
    )
  }
}

Lunchspaces.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Lunchspaces)
