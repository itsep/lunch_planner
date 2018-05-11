import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Collapse from 'material-ui/transitions/Collapse'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'
import FormSection from 'components/form_section'

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

class CreateLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: '',
      locationCreated: false,
      isLoading: false,
      error: undefined,
      lastErrorMessage: '',
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLocationNameChange(event) {
    const locationName = event.target.value
    this.setState({
      locationName,
    })
  }

  handleSubmit() {
    const { locationName } = this.state
    const data = { locationName }
    this.setState({
      isLoading: true,
      error: null,
    })
    return fetch('/api/location', {
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
            locationCreated: true,
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
        <Collapse in={!this.state.locationCreated}>
          <ValidatorForm
            onSubmit={this.handleSubmit}
          >
            <Typography className={classes.title} variant="title">
              Create Location
            </Typography>
            <TextValidator
              name="location-name"
              label="Location Name"
              className={classes.textField}
              value={this.state.locationName}
              onChange={this.handleLocationNameChange}
              validators={['required', 'maxStringLength:24']}
              errorMessages={['this field is required', 'maximum 24 characters']}
              margin="normal"
              autoComplete="location"
              autoFocus
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
                Create Location
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
        <Collapse in={this.state.locationCreated}>
          <span>Location successful created.</span>
        </Collapse>
      </FormSection>
    )
  }
}

CreateLocation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateLocation)
