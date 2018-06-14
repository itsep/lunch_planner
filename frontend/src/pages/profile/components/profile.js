import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Done from '@material-ui/icons/Done'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import apiFetch from 'lib/api_fetch'
import AuthorizedHeaderBar from '../../../components/authorized_header_bar'
import localizedStrings from '../../../lib/localization'
import UserAvatar from '../../../components/user_avatar'

const styles = theme => ({
  profile: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    minWidth: '500px',
    maxWidth: '800px',
  },
  form: {
    display: 'flex',
  },
  avatar: {
    width: '128px',
    height: '128px',
    margin: '48px auto',
    fontSize: '4em',
  },
  profileRow: {
    marginTop: '12px',
    height: '60px',
  },
  textField: {
    marginRight: '1em',
    marginTop: '-13px',
  },
  loadingCircleContainer: {
    width: '95vw',
    height: '60vw',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: '-1',
  },
  progressIndicator: {
    margin: theme.spacing.unit,
  },
})

const leftColumn = 2
const middleColumn = 7
const rightColumn = 3

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onNameChange: false,
      onPasswordChange: false,
      error: null,
      lastError: null,
      user: {
        firstName: '',
        lastName: '',
      },
      newUser: {
        firstName: '',
        lastName: '',
      },
      isLoading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    apiFetch('api/account/', {
      method: 'GET',
    }).then((response) => {
      const { user } = response.data
      this.setState({
        user,
        newUser: user,
      })
    })
  }
  handleLastNameChange() {
    const that = this
    return (event) => {
      that.setState({
        newUser: {
          ...this.state.newUser,
          lastName: event.target.value,
        },
      })
    }
  }
  handleFirstNameChange() {
    const that = this
    return (event) => {
      that.setState({
        newUser: {
          ...this.state.newUser,
          firstName: event.target.value,
        },
      })
    }
  }
  handleSubmit() {
    this.setState({
      isLoading: true,
    })
    apiFetch('/api/account/change_name', {
      method: 'PUT',
      body: {
        firstName: this.state.newUser.firstName,
        lastName: this.state.newUser.lastName,
      },
    }).then((data) => {
      if (data.response.ok) {
        this.setState({
          onNameChange: false,
          user: this.state.newUser,
        })
      }
    }).finally(() => {
      this.setState({
        isLoading: false,
      })
    }).catch(error => this.setState({ error, lastError: error }))
  }
  render() {
    const { user } = this.state
    const { classes } = this.props
    return (
      <div>
        <AuthorizedHeaderBar title={localizedStrings.profile} user={this.state.user} />
        <div className={classes.profile}>
          <UserAvatar
            user={user}
            className={classes.avatar}
          />
          <Grid container className={classes.profileGrid}>
            <Grid container spacing={16} className={classes.profileRow} alignItems="baseline">
              <Grid item xs={leftColumn} align="right">
                <Typography variant="title" color="textSecondary">{localizedStrings.name}</Typography>
              </Grid>
              <Grid item xs={middleColumn}>
                {this.state.onNameChange ?
                  (
                    <ValidatorForm
                      onSubmit={this.handleSubmit}
                      className={classes.form}
                    >
                      <TextValidator
                        name="first-name"
                        label="First Name"
                        className={classes.textField}
                        value={this.state.newUser.firstName}
                        onChange={this.handleFirstNameChange()}
                        validators={['required']}
                        errorMessages={[localizedStrings.fieldRequired]}
                        autoComplete="given-name"
                        autoFocus
                      />
                      <TextValidator
                        name="last-name"
                        label="Last Name"
                        className={classes.textField}
                        value={this.state.newUser.lastName}
                        onChange={this.handleLastNameChange()}
                        validators={['required']}
                        errorMessages={[localizedStrings.fieldRequired]}
                        autoComplete="family-name"
                      />
                      <IconButton
                        type="submit"
                        size="large"
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        disabled={this.state.isLoading}
                      >
                        <Done />
                      </IconButton>
                    </ValidatorForm>
                    )
                  :
                  (<Typography variant="title">{user.firstName} {user.lastName}</Typography>)
                }
              </Grid>
              <Grid item xs={rightColumn}>
                {this.state.onNameChange ?
                  (
                    <Button
                      type="button"
                      size="large"
                      variant="flat"
                      color="secondary"
                      disabled={this.state.isLoading}
                      onClick={() => {
                        this.setState({ onNameChange: false, newUser: this.state.user })
                      }}
                    >
                      {localizedStrings.cancel}
                    </Button>
                  )
                  :
                  (
                    <Button
                      type="button"
                      size="large"
                      variant="flat"
                      color="primary"
                      disabled={this.state.isLoading}
                      onClick={() => { this.setState({ onNameChange: true }) }}
                    >
                      {localizedStrings.change}
                    </Button>
                  )
                }
              </Grid>
            </Grid>
            <Grid container spacing={16} className={classes.profileRow}>
              <Grid item xs={leftColumn} align="right">
                <Typography variant="title" color="textSecondary">{localizedStrings.email}</Typography>
              </Grid>
              <Grid item xs={middleColumn}>
                <Typography variant="title">{user.email}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={16} className={classes.profileRow}>
              <Grid item xs={leftColumn} />
              <Grid item xs={middleColumn}>
                <Button
                  type="button"
                  size="large"
                  variant="flat"
                  color="secondary"
                  disabled={this.state.isLoading}
                  onClick={() => { this.setState({ onPasswordChange: true }) }}
                >
                  {localizedStrings.changePassword}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={!!this.state.error}>
            <Typography color="error" className={classes.errorMessage}>
              {this.state.lastError && this.state.lastError.toLocalizedString(localizedStrings)}
            </Typography>
          </Collapse>
          <Collapse in={this.state.isLoading} className={classes.loadingCircleContainer}>
            <Fade
              in={this.state.isLoading}
              unmountOnExit
            >
              <CircularProgress size="36px" className={classes.progressIndicator} />
            </Fade>
          </Collapse>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)

