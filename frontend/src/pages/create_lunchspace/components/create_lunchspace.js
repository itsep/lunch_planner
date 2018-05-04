import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import { TextValidator, ValidatorForm, ValidatorComponent } from 'react-material-ui-form-validator'
import MiddleSection from './middle_section'

import { escapeSubdomain, isValidSubdomain } from '../../../lib/subdomain'

const styles = theme => ({
  textField: {
    width: '300px',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class FormControlInputValidator extends ValidatorComponent {
  render() {
    const {
      inputLabel, className, errorMessages, validators,
      requiredError, errorText, validatorListener, children, ...rest
    } = this.props
    const { isValid } = this.state

    return (
      <FormControl className={className} error={!isValid}>
        {inputLabel}
        <Input
          ref={(r) => { this.input = r }}
          {...rest}
        />
        <FormHelperText id="name-error-text">
          {(!isValid && this.getErrorMessage()) || errorText}
        </FormHelperText>
      </FormControl>
    )
  }
}

class CreateLunchspace extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   activeStep: 0,
    //   lunchspaceName: '',
    //   subdomain: '',
    // }
    // DEBUG
    this.state = {
      activeStep: 1,
      lunchspaceName: 'vsf experts Mannheim',
      subdomain: 'vsf-experts-ma',
    }

    this.handleLunchspaceNameChange = this.handleLunchspaceNameChange.bind(this)
    this.handleSubdomainChange = this.handleSubdomainChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    // your submit logic
    console.log(this.state)
  }

  render() {
    const { classes } = this.props

    return (
      <MiddleSection className={classes.root}>
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
          <div className={classes.actionsContainer}>
            <div>
              <Button
                type="submit"
                variant="raised"
                color="primary"
                className={classes.button}
              >
                Create Workspace
              </Button>
            </div>
          </div>
        </ValidatorForm>
      </MiddleSection>
    )
  }
}

CreateLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateLunchspace)
