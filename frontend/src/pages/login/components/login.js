import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'
import Collapse from 'material-ui/transitions/Collapse'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import FormSection from 'components/form_section'
import routeLocations from '../../route_locations'
import localizedStrings from '../../../localization'
import apiFetch from '../../../lib/api_fetch'

const styles = theme => ({
  textField: {
    width: '100%',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
      loggedIn: false,
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
    const data = { email, password }
    this.setState({
      isLoading: true,
      error: null,
    })
    apiFetch('/api/account/login', {
      method: 'POST',
      body: data,
    })
      .then(() => {
        this.setState({
          loggedIn: true,
        })
        window.location = routeLocations.HOMEPAGE
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
          >
            <Typography className={classes.title} variant="title">
              Login
            </Typography>
            <TextValidator
              name="email"
              label="Email"
              type="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              validators={['required', 'isEmail']}
              errorMessages={[localizedStrings.fieldRequired, localizedStrings.invalidEmail]}
              margin="normal"
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
              margin="normal"
              autoComplete="current-password"
            />
            <Collapse in={!!this.state.error}>
              <Typography color="error">
                {this.state.lastError && this.state.lastError.toLocalizedString(localizedStrings)}
              </Typography>
            </Collapse>
            <div className={classes.actionsContainer}>
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
              <Fade
                in={this.state.isLoading}
                unmountOnExit
              >
                <CircularProgress size="36px" />
              </Fade>
              <Button
                type="button"
                size="large"
                variant="raised"
                color="secondary"
                className={classes.button}
                disabled={this.state.isLoading}
                href={routeLocations.REGISTRATION}
              >
                sign up
              </Button>
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

