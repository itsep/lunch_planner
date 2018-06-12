import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import apiFetch from '../../../lib/api_fetch'
import localizedStrings from '../../../lib/localization'

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
  titleSection: {
    display: 'flex',
  },
  title: {
    margin: theme.spacing.unit,
    flex: 1,
  },
  loadingIndicator: {
    margin: `0 ${theme.spacing.unit}px`,
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

class InviteteToCurrentLunchspace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailToInvite: '',
      invitationSent: false,
      isLoading: false,
      error: undefined,
      lastErrorMessage: '',
    }

    this.handleEmailToInviteChange = this.handleEmailToInviteChange.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailToInviteChange(event) {
    const emailToInvite = event.target.value
    this.setState({
      emailToInvite,
    })
  }
  handleSnackbarClose() {
    this.setState({
      invitationSent: false,
    })
  }
  handleSubmit() {
    const { emailToInvite } = this.state
    this.setState({
      isLoading: true,
    })
    apiFetch('api/lunchspace/invite', {
      method: 'POST',
      body: {
        receivers: [emailToInvite],
      },
    }).then(data => data.response)
      .then((response) => {
        if (response.ok) {
          this.setState({
            invitationSent: true,
          })
        }
      }).finally(() => {
        this.setState({
          emailToInvite: '',
          isLoading: false,
          error: undefined,
        })
      })
      .catch(error => console.error(error))
  }

  render() {
    const { classes, fullScreen } = this.props

    return (
      <div>
        <Dialog
          open={this.props.show}
          fullScreen={fullScreen}
          onClose={this.props.onClose}
        >
          <div className={classes.root}>
            <ValidatorForm
              onSubmit={this.handleSubmit}
              className={classes.form}
            >
              <section className={classes.titleSection}>
                <Typography variant="title" className={classes.title}>
                  {localizedStrings
                    .formatString(localizedStrings
                      .inviteToCurrentLunchspace, { lunchspaceName: this.props.lunchspace.name })}
                </Typography>
                <Fade
                  in={this.state.isLoading}
                  unmountOnExit
                >
                  <CircularProgress size="36px" className={classes.loadingIndicator} />
                </Fade>
              </section>
              <TextValidator
                name="email-to-invite"
                label="Email"
                className={classes.textField}
                value={this.state.emailToInvite}
                onChange={this.handleEmailToInviteChange}
                validators={['required', 'isEmail']}
                errorMessages={[localizedStrings.fieldRequired, localizedStrings.invalidEmail]}
                margin="normal"
                autoFocus
              />
              <Collapse in={!!this.state.error}>
                <Typography color="error">
                  {this.state.lastErrorMessage}
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
                    onClick={this.props.onClose}
                    disabled={this.state.isLoading}
                  >
                    {localizedStrings.cancel}
                  </Button>
                  <Button
                    type="submit"
                    size="large"
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleSubmit}
                    disabled={this.state.isLoading}
                  >
                    {localizedStrings.invite}
                  </Button>
                </div>
              </div>
            </ValidatorForm>
          </div>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.invitationSent}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{localizedStrings.invitationSent}</span>}
        />
      </div>
    )
  }
}

InviteteToCurrentLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
  lunchspace: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles)(withMobileDialog()(connect(mapStateToProps)(InviteteToCurrentLunchspace)))
