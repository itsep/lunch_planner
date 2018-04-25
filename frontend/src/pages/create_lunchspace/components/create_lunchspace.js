import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepButton, StepContent } from 'material-ui/Stepper'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import TextField from 'material-ui/TextField'
import { FormControl } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    width: '90%',
  },
  textField: {
    width: '280px',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
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
      activeStep: 2,
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

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
          {/* You */}
          <Step key="lunchspace">
            <StepButton
              onClick={this.handleStep(0)}
              completed={false}
            >
              Lunchspace
            </StepButton>
            <StepContent>
              <div>
                <TextField
                  id="lunchspace-name"
                  label="Lunchspace Name"
                  className={classes.textField}
                  value={this.state.lunchspaceName}
                  onChange={this.handleChange('lunchspaceName')}
                  margin="normal"
                />
              </div>
              <div>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="input-with-icon-adornment" shrink>Subdomain to your Lunchspace</InputLabel>
                  <Input
                    id="subdomain"
                    placeholder="your-space-url"
                    value={this.state.subdomain}
                    onChange={this.handleChange('subdomain')}
                    endAdornment={
                      <InputAdornment position="end">
                        .lunchspace.de
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          {/* Your Account */}
          <Step key="your-account">
            <StepButton
              onClick={this.handleStep(1)}
              completed={false}
            >
              Your Account
            </StepButton>
            <StepContent>
              <div>
                <TextField
                  id="first-name"
                  label="First Name"
                  className={classes.textField}
                  value={this.state.firstName}
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="last-name"
                  label="Last Name"
                  className={classes.textField}
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
              </div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
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
              <Typography variant="Subheading">
                Name
              </Typography>
              <Typography variant="body1">
                {this.state.lunchspaceName}
              </Typography>
              <Typography variant="Subheading">
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
              <Typography variant="Subheading">
                Email
              </Typography>
              <Typography variant="body1">
                {this.state.email}
              </Typography>
              <Typography variant="Subheading">
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
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

CreateLunchspace.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(CreateLunchspace)
