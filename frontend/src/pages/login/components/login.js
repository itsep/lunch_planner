import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Collapse from '@material-ui/core/Collapse'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import FormSection from 'components/form_section'
import routeLocations from '../../route_locations'
import localizedStrings from '../../../localization'
import apiFetch from '../../../lib/api_fetch'
import { withLunchspaceSubdomain, currentLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    margin: theme.spacing.unit,
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
  progressIndicator: {
    margin: theme.spacing.unit,
  },
})

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(name) {
    const that = this
    return (event) => {
      that.setState({
        [name]: event.target.value,
      })
    }
  }
  handleSubmit() {
    const { email, password } = this.state
    this.setState({
      isLoading: true,
      error: null,
    })
    apiFetch('/api/account/login', {
      method: 'POST',
      body: { email, password },
    })
      .then(({ data }) => {
        this.setState({
          loggedIn: true,
        })
        const { lunchspaces } = data
        const preferedSubdomain =
          // has already selected a lunchspace
          currentLunchspaceSubdomain() ||
          // the user is in exactly one lunchspace, redirect diretly to the homepage
          ((lunchspaces.length === 1) && lunchspaces[0])

        if (preferedSubdomain) {
          window.location = withLunchspaceSubdomain(
            routeLocations.HOMEPAGE,
            preferedSubdomain,
            true
          )
        } else {
          // the user has no lunchspaces or more than one, redirect to lunchspaces
          window.location = routeLocations.LUNCHSPACES
        }
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
    return (
      <FormSection className={classes.root}>
        <Collapse in={!this.state.loggedIn}>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
            <TextValidator
              name="email"
              label="Email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              validators={['required', 'isEmail']}
              errorMessages={[localizedStrings.fieldRequired, localizedStrings.invalidEmail]}
              autoComplete="username"
            />
            <TextValidator
              label="Password"
              onChange={this.handleChange('password')}
              name="password"
              type="password"
              validators={['required']}
              errorMessages={[localizedStrings.fieldRequired]}
              value={this.state.password}
              className={classes.textField}
              autoComplete="current-password"
            />
            <Collapse in={!!this.state.error}>
              <Typography color="error" className={classes.errorMessage}>
                {this.state.lastError && this.state.lastError.toLocalizedString(localizedStrings)}
              </Typography>
            </Collapse>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  type="button"
                  size="large"
                  variant="flat"
                  color="secondary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                  href={routeLocations.REGISTRATION}
                >
                  {localizedStrings.signUp}
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                >
                  {localizedStrings.login}
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
        </Collapse>
        <Collapse in={this.state.loggedIn}>
          <Typography variant="title" color="primary">
            {this.state.email} successful logged in.
          </Typography>
        </Collapse>
      </FormSection>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)

