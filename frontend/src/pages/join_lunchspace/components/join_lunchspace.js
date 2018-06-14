import React, { Component } from 'react'
import withQuery from 'with-query'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { ValidatorForm } from 'react-material-ui-form-validator/'
import FormSection from 'components/form_section'
import withStyles from '@material-ui/core/styles/withStyles'
import redirectTo from 'lib/redirectTo'
import PropTypes from 'prop-types'
import localizedStrings from '../../../lib/localization'
import apiFetch from '../../../lib/api_fetch'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'
import routeLocations from '../../route_locations'
import { withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import { isDefinitelyNotAuthenticated } from '../../../lib/authentication'

const styles = theme => ({
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '60vh',
    width: '100vw',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: theme.spacing.unit,
  },
  name: {
    margin: theme.spacing.unit,
    fontWeight: 600,
  },
  errorMessage: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})


class JoinLunchspace extends Component {
  static redirectToLogin() {
    window.location = redirectTo(routeLocations.LOGIN)
  }

  constructor(props) {
    super(props)
    this.state = {
      lunchspace: null,
      user: null,
      isLoading: false,
      error: null,
      lastError: null,
    }
    this.handleCloseError = this.handleCloseError.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    if (isDefinitelyNotAuthenticated()) {
      JoinLunchspace.redirectToLogin()
    }
    const url = new URL(window.location.href)
    const apiUrlString = withQuery('/api/lunchspace/check', { token: url.searchParams.get('token') })
    this.setState({ isLoading: true }) // eslint-disable-line react/no-did-mount-set-state
    apiFetch(apiUrlString, {
      method: 'GET',
    }).then(({ data }) => {
      if (data) {
        this.setState({
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          lunchspace: data.lunchspace,
        })
      }
    }).catch((error) => {
      this.setState({ error, lastError: error })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  handleCloseError() {
    this.setState({ error: null })
  }

  handleSubmit() {
    const url = new URL(window.location.href)
    const apiUrlString = `/api/lunchspace/join${url.search}`
    this.setState({
      isLoading: true,
      error: null,
    })
    apiFetch(apiUrlString, {
      method: 'POST',
      body: {
        wantsToJoin: true,
      },
    }).then(() => {
      window.location = withLunchspaceSubdomain(
        routeLocations.HOMEPAGE,
        this.state.lunchspace.subdomain,
        true
      )
    }).catch((error) => {
      this.setState({ error, lastError: error })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  logout() {
    this.setState({
      user: null,
      isLoading: true,
    })
    apiFetch('/api/account/logout', {
      method: 'POST',
    }).finally(() => {
      JoinLunchspace.redirectToLogin()
    })
  }

  isTokenInvalid() {
    return (!this.state.user || !this.state.lunchspace.name)
  }

  render() {
    const { classes } = this.props
    if (this.state.isLoading) {
      return (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )
    }
    if (this.isTokenInvalid()) {
      return (
        <Dialog open>
          <DialogTitle id="alert-dialog-title">
            {localizedStrings.invalidInvitationLink}
          </DialogTitle>
        </Dialog>
      )
    }
    if (this.state.error) {
      return (
        <Dialog open onClose={this.handleCloseError}>
          <DialogTitle id="alert-dialog-title">
            {this.state.lastError.toString()}
          </DialogTitle>
        </Dialog>
      )
    }
    return (
      <div>
        <UnauthorizedHeaderBar title={localizedStrings.joinLunchspaceTitle} />
        <FormSection className={classes.root}>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
            <Typography className={classes.name} variant="title">
              {this.state.user.firstName} {this.state.user.lastName}
            </Typography>
            <Typography className={classes.title} variant="title">
              {localizedStrings
                .formatString(localizedStrings
                  .joinLunchspace, { lunchspaceName: this.state.lunchspace.name })}
            </Typography>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  type="button"
                  size="large"
                  variant="flat"
                  color="secondary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                  onClick={this.logout}
                >
                  {localizedStrings.notYou}
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                >
                  {localizedStrings.accept}
                </Button>
              </div>
              <Fade
                in={this.state.isLoading}
                unmountOnExit
              >
                <CircularProgress size="36px" className={classes.progressIndicator} />
              </Fade>
            </div>
          </ValidatorForm>
        </FormSection>
      </div>
    )
  }
}

JoinLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JoinLunchspace)
