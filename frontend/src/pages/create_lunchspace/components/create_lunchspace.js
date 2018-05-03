import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepButton, StepContent } from 'material-ui/Stepper'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
import { TextValidator, ValidatorForm, ValidatorComponent } from 'react-material-ui-form-validator'
import MiddleSection from './middle_section'

import { escapeSubdomain, isValidSubdomain } from '../../../lib/subdomain'

const styles = theme => ({
  textField: {
    width: '280px',
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
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    // }
    // DEBUG
    this.state = {
      activeStep: 0,
      lunchspaceName: 'vsf experts Mannheim',
      subdomain: 'vsf-experts-ma',
      firstName: 'David',
      lastName: 'Nadoba',
      email: 'dnadoba@gmail.com',
      password: 'fantastic password',
    }

    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleStep = this.handleStep.bind(this)
    this.handleReset = this.handleReset.bind(this)
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

  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  handleBack() {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }

  handleStep(step) {
    return () => {
      this.setState({
        activeStep: step,
      })
    }
  }

  handleReset() {
    this.setState({
      activeStep: 0,
    })
  }

  handleSubmit() {
    // your submit logic
    console.log(this.state)
  }

  render() {
    const { classes } = this.props
    const { activeStep } = this.state
    const stepsCount = 3

    return (
      <MiddleSection className={classes.root}>

        <Stepper activeStep={activeStep} orientation="vertical">
          {/* You */}
          <Step key="lunchspace">
            <StepButton
              onClick={this.handleStep(0)}
              completed={activeStep > 0}
            >
              Lunchspace
            </StepButton>
            <StepContent>
              <ValidatorForm
                onSubmit={this.handleNext}
              >
                <div>
                  <TextValidator
                    name="lunchspace-name"
                    label="Lunchspace Name"
                    className={classes.textField}
                    value={this.state.lunchspaceName}
                    onChange={this.handleLunchspaceNameChange}
                    validators={['required']}
                    errorMessages={['this field is required']}
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
                    validators={['required', 'isValidSubdomain']}
                    errorMessages={['this field is required', 'a subdomain may not contain a leading or trailing hyphen(-)']}
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
                      Next
                    </Button>
                  </div>
                </div>
              </ValidatorForm>
            </StepContent>
          </Step>
          {/* Your Account */}
          <Step key="your-account">
            <StepButton
              onClick={this.handleStep(1)}
              completed={activeStep > 1}
            >
              Your Account
            </StepButton>
            <StepContent>
              <ValidatorForm
                onSubmit={this.handleNext}
              >
                <div>
                  <TextValidator
                    name="first-name"
                    label="First Name"
                    className={classes.textField}
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextValidator
                    name="last-name"
                    label="Last Name"
                    className={classes.textField}
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextValidator
                    name="email"
                    label="Email"
                    type="email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    margin="normal"
                  />
                </div>
                <div>
                  <TextValidator
                    label="Password"
                    onChange={this.handleChange('password')}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.password}
                    className={classes.textField}
                    margin="normal"
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
                      Next
                    </Button>
                  </div>
                </div>
              </ValidatorForm>
            </StepContent>
          </Step>
          {/* Summary */}
          <Step key="summeray">
            <StepButton
              onClick={this.handleStep(2)}
              completed={false}
            >
              Summary
            </StepButton>
            <StepContent>
              <Typography variant="title">
                Lunchspace
              </Typography>
              <Typography variant="subheading">
                Name
              </Typography>
              <Typography variant="body1">
                {this.state.lunchspaceName}
              </Typography>
              <Typography variant="subheading">
                Domain
              </Typography>
              <Typography variant="body1">
                {this.state.subdomain}.lunchspace.de
              </Typography>

              <br />
              <Typography variant="title">
                Your Account
              </Typography>
              <Chip
                avatar={<Avatar>{`${this.state.firstName.charAt(0)}${this.state.lastName.charAt(0)}`}</Avatar>}
                label={`${this.state.firstName} ${this.state.lastName}`}
                className={classes.chip}
              />
              <Typography variant="subheading">
                Email
              </Typography>
              <Typography variant="body1">
                {this.state.email}
              </Typography>
              <Typography variant="subheading">
                Password
              </Typography>
              <Typography variant="body1">
                {Array(this.state.password.length).fill().map(() => '•')}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                  >
                    Create Lunchspace
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === stepsCount && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </MiddleSection>
    )
  }
}

CreateLunchspace.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(CreateLunchspace)
