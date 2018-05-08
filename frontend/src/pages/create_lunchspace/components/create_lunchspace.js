import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { InputLabel, InputAdornment } from 'material-ui/Input'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'
import FormControlInputValidator from 'components/form_control_input_validator'
import FormSection from 'components/form_section'

import { escapeSubdomain, isValidSubdomain } from 'shared/lib/subdomain'

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
      lastErrorMessage: '',
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
    return fetch('/api/lunchspace', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          this.setState({
            lunchspaceCreated: true,
          })
          return null
        }
        return response.json().then(({ error }) => { throw new Error(error) })
      })
      .catch((error) => {
        this.setState({ error, lastErrorMessage: error.message })
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
              errorMessages={['this field is required', 'maximum 24 characters']}
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
              errorMessages={['this field is required', 'a subdomain may not contain a leading or trailing hyphen(-)', 'maximum 24 characters']}
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
                {this.state.lastErrorMessage}
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
                Create Workspace
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
          <span>Lunchspace </span>
          <a href={`//${this.state.lunchspaceSubdomain}.lunchspace.de`}>
            {this.state.lunchspaceName}
          </a>
          <span> successful created.</span>
        </Collapse>
      </FormSection>
    )
  }
}

CreateLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateLunchspace)
