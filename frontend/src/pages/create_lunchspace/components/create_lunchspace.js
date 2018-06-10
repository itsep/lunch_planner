import { escapeSubdomain, isValidSubdomain } from 'shared/lib/subdomain'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlInputValidator from 'components/form_control_input_validator'
import FormSection from 'components/form_section'
import apiFetch from '../../../lib/api_fetch'
import localizedStrings from '../../../localization'
import { withLunchspaceSubdomain } from '../../../lib/lunchspace_subdomain'
import routeLocations from '../../route_locations'

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

class CreateLunchspace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lunchspaceName: '',
      lunchspaceSubdomain: '',
      lunchspaceCreated: false,
      isLoading: false,
      error: undefined,
      lastError: null,
    }

    this.handleLunchspaceNameChange = this.handleLunchspaceNameChange.bind(this)
    this.handleSubdomainChange = this.handleSubdomainChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    ValidatorForm.addValidationRule('isValidSubdomain', isValidSubdomain)
  }

  handleLunchspaceNameChange(event) {
    const lunchspaceName = event.target.value
    if (!this.hasCustomSubdomainName()) {
      this.setState({
        lunchspaceSubdomain: escapeSubdomain(lunchspaceName),
      })
    }
    this.setState({
      lunchspaceName,
    })
  }

  handleSubdomainChange(event) {
    const lunchspaceSubdomain = event.target.value
    this.setState({
      lunchspaceSubdomain: escapeSubdomain(lunchspaceSubdomain),
    })
  }

  hasCustomSubdomainName() {
    return escapeSubdomain(this.state.lunchspaceName) !== this.state.lunchspaceSubdomain
  }

  handleSubmit() {
    const { lunchspaceName, lunchspaceSubdomain } = this.state
    const data = { lunchspaceName, lunchspaceSubdomain }
    this.setState({
      isLoading: true,
      error: null,
    })
    return apiFetch('/api/lunchspace', {
      method: 'POST',
      body: data,
    })
      .then(() => {
        this.setState({
          lunchspaceCreated: true,
        })
        const subdomain = this.state.lunchspaceSubdomain
        window.location = withLunchspaceSubdomain(
          routeLocations.HOMEPAGE,
          subdomain,
          true
        )
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
        <Collapse in={!this.state.lunchspaceCreated}>
          <ValidatorForm
            onSubmit={this.handleSubmit}
          >
            <Typography className={classes.title} variant="title">
              Create Lunchspace
            </Typography>
            <TextValidator
              name="lunchspace-name"
              label="Lunchspace Name"
              className={classes.textField}
              value={this.state.lunchspaceName}
              onChange={this.handleLunchspaceNameChange}
              validators={['required', 'maxStringLength:24']}
              errorMessages={[localizedStrings.fieldRequired,
                localizedStrings.inputTooLong24]}
              margin="normal"
              autoComplete="organization"
              autoFocus
            />
            <FormControlInputValidator
              className={classes.textField}
              name="subdomain"
              placeholder="your-space-url"
              value={this.state.lunchspaceSubdomain}
              onChange={this.handleSubdomainChange}
              validators={['required', 'isValidSubdomain', 'maxStringLength:24']}
              errorMessages={[localizedStrings.fieldRequired,
                localizedStrings.illegalHyphen,
                localizedStrings.inputTooLong24]}
              inputLabel={
                <InputLabel htmlFor="input-with-icon-adornment" shrink>Subdomain to your Lunchspace</InputLabel>
              }
              endAdornment={
                <InputAdornment position="end">
                  .lunchspace.de
                </InputAdornment>
              }
              autoComplete="off"
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
                {localizedStrings.createLunchspace}
              </Button>
              <Fade
                in={this.state.isLoading}
                unmountOnExit
              >
                <CircularProgress size="36px" />
              </Fade>
            </div>
          </ValidatorForm>
        </Collapse>
        <Collapse in={this.state.lunchspaceCreated}>
          {localizedStrings.formatString(localizedStrings.lunchspaceSuccessfulCreated, {
            lunchspaceName: (
              <a href={withLunchspaceSubdomain(
                routeLocations.HOMEPAGE,
                this.state.lunchspaceSubdomain,
                true
              )}
              >
                {this.state.lunchspaceName}
              </a>
            ),
          })}
        </Collapse>
      </FormSection>
    )
  }
}

CreateLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateLunchspace)
