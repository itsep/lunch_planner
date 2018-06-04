import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import FormSection from 'components/form_section'
import apiFetch from '../../../lib/api_fetch'
import { routeLocations, whiteListRoutes } from '../../route_locations'
import localizedStrings from '../../../localization'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: theme.spacing.unit,
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

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isLoading: false,
      error: null,
      lastError: null,
      loggedIn: false,
      redirect: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const urlString = window.location.href
    const url = new URL(urlString)
    const redirect = url.searchParams.get('redirect')
    const token = url.searchParams.get('token')
    console.log(redirect)
    if (whiteListRoutes.indexOf(redirect) >= 0) {
      this.setState({ redirect: `${redirect}?token=${token}` })
    }
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
    const {
      email, password, firstName, lastName,
    } = this.state
    const data = {
      firstName, lastName, email, password,
    }
    this.setState({
      isLoading: true,
      error: null,
    })
    apiFetch('/api/account', {
      method: 'POST',
      body: data,
    })
      .then(() => {
        this.setState({
          loggedIn: true,
        })
        window.location = this.state.redirect ? this.state.redirect : routeLocations.HOMEPAGE
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
            <Typography className={classes.title} variant="title">
              Registration
            </Typography>
            <TextValidator
              name="first-name"
              label="First Name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
              validators={['required']}
              errorMessages={[localizedStrings.fieldRequired]}
              autoComplete="given-name"
              autoFocus
            />
            <TextValidator
              name="last-name"
              label="Last Name"
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
              validators={['required']}
              errorMessages={[localizedStrings.fieldRequired]}
              autoComplete="family-name"
            />
            <TextValidator
              name="email"
              label="Email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              validators={['required', 'isEmail']}
              errorMessages={[localizedStrings.fieldRequired, localizedStrings.invalidEmail]}
              autoComplete="email"
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
              autoComplete="new-password"
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
                  href={routeLocations.LOGIN}
                >
                  {localizedStrings.login}
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                >
                  {localizedStrings.signUp}
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
            {this.state.email} successful registered.
          </Typography>
        </Collapse>
      </FormSection>
    )
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Registration)

