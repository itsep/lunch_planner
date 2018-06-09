import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormSection from 'components/form_section'
import { fetchCreateLocation } from '../actions'

const mapDispatchToProps = dispatch => ({
  fetchCreateLocationAction: (locationName, lunchspace) =>
    dispatch(fetchCreateLocation(locationName, lunchspace)),
})

const mapStateToProps = state => ({
  lunchspace: state.lunchspace,
})

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 420,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      minWidth: 420,
    },
  },
  title: {
    margin: theme.spacing.unit,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  textField: {
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
    const { lunchspace } = this.props
    this.setState({
      isLoading: true,
    })
    this.props.fetchCreateLocationAction(locationName, lunchspace)
      .then(() => {
        this.setState({
          isLoading: false,
        })
        this.props.onClose()
      })
  }

  render() {
    const { classes, fullScreen } = this.props

    return (
      <Dialog
        open={this.props.show}
        fullScreen={fullScreen}
        onClose={this.props.onClose}
      >
        <div className={classes.root}>
          <Collapse in={!this.state.locationCreated}>
            <ValidatorForm
              onSubmit={this.handleSubmit}
              className={classes.form}
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
                  onClick={this.handleSubmit}
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
        </div>
      </Dialog>
    )
  }
}

CreateLocation.propTypes = {
  classes: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchCreateLocationAction: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLocation)))
