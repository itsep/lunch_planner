import React, { Component } from 'react'
import { Dialog, DialogTitle, CircularProgress, Button, Typography } from 'material-ui'
import { ValidatorForm } from 'react-material-ui-form-validator'
import FormSection from 'components/form_section'
import { withStyles } from 'material-ui/styles'
import { toLogin } from 'lib/redirect'
import Fade from 'material-ui/transitions/Fade'
import PropTypes from 'prop-types'
import localizedStrings from '../../../localization'
import apiFetch from '../../../lib/api_fetch'
import UnauthorizedHeaderBar from '../../../components/unauthorized_header_bar'

const styles = theme => ({
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '60vh',
    width: '100vw',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: theme.spacing.unit,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  errorMessage: {
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
  progressIndicator: {
    margin: theme.spacing.unit,
  },
})


class JoinLunchspace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lunchspaceName: 'Test',
      user: {
        firstname: 'Sebastian',
        lastname: 'Vogt',
      },
      isLoading: false,
      error: null,
    }
    this.handleCloseError = this.handleCloseError.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    const urlString = window.location.href
    const url = new URL(urlString)
    const apiUrlString = `/api${url.pathname}${url.search}`
    this.setState({ isLoading: true }) // eslint-disable-line react/no-did-mount-set-state
    apiFetch(apiUrlString, {
      method: 'GET',
    }).then(({ data }) => {
      this.setState({ lunchspaceName: data.lunchspaceName, user: data.user })
    }).catch((error) => {
      this.setState({ error })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  handleCloseError() {
    this.setState({ error: null })
  }

  handleSubmit() {
    console.log('Submit')
  }

  logout() {
    this.setState({
      user: {
        firstname: null,
        lastname: null,
      },
      isLoading: true,
    })
    apiFetch('/api/account/logout', {
      method: 'POST',
    }).catch((error) => {
      this.setState({ error })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { classes } = this.props
    if (!document.cookie) {
      window.location = toLogin()
    }
    if (this.state.error) {
      return (
        <Dialog open onClose={this.handleCloseError}>
          <DialogTitle id="alert-dialog-title">
            {this.state.error.toString()}
          </DialogTitle>
        </Dialog>
      )
    }
    if (this.state.isLoading) {
      return (
        <div className={this.props.classes.loadingWrapper}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <div>
        <UnauthorizedHeaderBar />
        <FormSection className={classes.root}>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
            <Typography className={classes.title} variant="title">
              {this.state.user.firstname} {this.state.user.lastname}
            </Typography>
            <Typography className={classes.title} variant="title">
              {localizedStrings
                .formatString(localizedStrings
                  .joinLunchspace, { lunchspaceName: this.state.lunchspaceName })}
            </Typography>
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  type="button"
                  size="large"
                  variant="flat"
                  color="secondary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                  onClick={this.logout}
                >
                  {localizedStrings.notYou}
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="raised"
                  color="primary"
                  className={classes.button}
                  disabled={this.state.isLoading}
                >
                  {localizedStrings.accept}
                </Button>
              </div>
              <Fade
                in={this.state.isLoading}
                unmountOnExit
              >
                <CircularProgress size="36px" className={classes.progressIndicator} />
              </Fade>
            </div>
          </ValidatorForm>
        </FormSection>
      </div>
    )
  }
}

JoinLunchspace.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JoinLunchspace)
