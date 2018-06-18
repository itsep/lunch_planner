import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TripleDot from '@material-ui/icons/MoreVert'
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import apiFetch from '../../../lib/api_fetch'
import localizedStrings from '../../../lib/localization'
import { currentLunchspaceSubdomain, domainForLunchspace, withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import routeLocations from '../../route_locations'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 420,
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
    // take the addLunchspaceButton into account
    marginBottom: (theme.spacing.unit * 2) + 56 + (theme.spacing.unit),
  },
  errorMessage: {
    padding: theme.spacing.unit,
  },
  addLunchspaceButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

class Lunchspaces extends React.Component {
  constructor(props) {
    super(props)
    this.currentLunchspaceSubdomain = currentLunchspaceSubdomain()
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
          // currentLunchspace: data.lunchspaces
          //   .find(lunchspace => lunchspace.subdomain === this.currentLunchspaceSubdomain),
        })
      })
      .catch((error) => {
        this.setState({ error, lastError: error })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { classes } = this.props
    const {
      user,
      lunchspaces,
      isLoading,
      error,
      lastError,
    } = this.state
    return (
      <div>
        <AuthorizedHeaderBar title={localizedStrings.myLunchspaces} user={user} />
        <div className={classes.root}>
          <div className={classes.container}>
            <Collapse in={!!error}>
              <section>
                <Typography color="error" className={classes.errorMessage}>
                  {lastError && lastError.toLocalizedString(localizedStrings)}
                </Typography>
              </section>
            </Collapse>
            <Fade in={!isLoading && !error}>
              <List className={classes.list}>
                {lunchspaces.map(lunchspace => (
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
                      <IconButton aria-label="Comments">
                        <TripleDot />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fade>
          </div>
        </div>
        <Button
          href={routeLocations.CREATE_LUNCHSPACE}
          variant="fab"
          color="primary"
          className={classes.addLunchspaceButton}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

Lunchspaces.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Lunchspaces)
