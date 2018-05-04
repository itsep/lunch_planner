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
import FormSection from './form_section'

import { escapeSubdomain, isValidSubdomain } from '../../../lib/subdomain'

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
    // this.state = {
    //   lunchspaceName: '',
    //   subdomain: '',
    // }
    // DEBUG
    this.state = {
      lunchspaceName: 'vsf experts Mannheim',
      subdomain: 'vsf-experts-ma',
      lunchspaceCreated: true,
      isLoading: false,
      error: undefined,
      lastErrorMessage: '',
    }

    this.handleLunchspaceNameChange = this.handleLunchspaceNameChange.bind(this)
    this.handleSubdomainChange = this.handleSubdomainChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    ValidatorForm.addValidationRule('isValidSubdomain', isValidSubdomain)
  }

  handleLunchspaceNameChange(event) {
    const lunchspaceName = event.target.value
    if (!this.hasCustomSubdomainName()) {
      this.setState({
        subdomain: escapeSubdomain(lunchspaceName),
      })
    }
    this.setState({
      lunchspaceName,
    })
  }

  handleSubdomainChange(event) {
    const subdomain = event.target.value
    this.setState({
      subdomain: escapeSubdomain(subdomain),
    })
  }

  hasCustomSubdomainName() {
    return escapeSubdomain(this.state.lunchspaceName) !== this.state.subdomain
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
    const { lunchspaceName, lunchspaceSubdomain } = this.state
    const data = { lunchspaceName, lunchspaceSubdomain }
    this.setState({
      isLoading: true,
      error: null,
    })
    fetch('/api/lunchspace', {
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
            <div>
              <TextValidator
                name="lunchspace-name"
                label="Lunchspace Name"
                className={classes.textField}
                value={this.state.lunchspaceName}
                onChange={this.handleLunchspaceNameChange}
                validators={['required', 'maxStringLength:24']}
                errorMessages={['this field is required', 'maximum 24 characters']}
                margin="normal"
                autoFocus
              />
            </div>
            <div>
              <FormControlInputValidator
                className={classes.textField}
                name="subdomain"
                placeholder="your-space-url"
                value={this.state.subdomain}
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
            </div>
            <Collapse in={this.state.error}>
              <Typography color="error">
                {this.state.lastErrorMessage}
              </Typography>
            </Collapse>
            <div className={classes.actionsContainer}>
              <Button
                type="submit"
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
          <a href={`${this.state.lunchspaceSubdomain}.lunchspace.de`}>
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
