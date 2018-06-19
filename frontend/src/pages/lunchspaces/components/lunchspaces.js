import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import apiFetch from '../../../lib/api_fetch'
import localizedStrings from '../../../lib/localization'
import { currentLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import routeLocations from '../../route_locations'
import eating from '../../../assets/illustrations/eating.svg'
import leaveLunchspace from './leave_lunchspace'
import LunchspaceListItem from '../LunchspaceListItem'

const styles = theme => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    flex: 1,
  },
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
    marginBottom: theme.spacing * 4,
  },
  errorMessage: {
    padding: theme.spacing.unit,
  },
  addLunchspaceButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  placeholder: {
    flex: 1,
  },
  eating: {
    display: 'block',
    maxWidth: '50vmax',
    marginLeft: 'auto',
    marginRight: 'auto',
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
    this.leaveLunchspace = this.leaveLunchspace.bind(this)
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
  leaveLunchspace(subdomain, forceDelete) {
    leaveLunchspace(subdomain, forceDelete).then(() => {
      this.setState((prevState) => {
        const lunchspaces = prevState.lunchspaces.filter(lunchpsace =>
          lunchpsace.subdomain !== subdomain)
        return {
          lunchspaces,
        }
      })
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
      <div className={classes.rootContainer}>
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
                  <LunchspaceListItem
                    key={lunchspace.subdomain}
                    lunchspace={lunchspace}
                    classes={classes}
                    leaveLunchspace={this.leaveLunchspace}
                  />
                ))}
              </List>
            </Fade>
          </div>
        </div>
        <div className={classes.placeholder} />
        <img src={eating} className={classes.eating} alt="" />
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
