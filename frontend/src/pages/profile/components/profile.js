import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormSection from 'components/form_section'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import apiFetch from 'lib/api_fetch'
import localizedStrings from 'lib/localization'
import { logout } from 'lib/authentication'
import UserAvatar from '../../../components/user_avatar'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: '160px',
    height: '160px',
    margin: 'auto',
  },
})

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        firstName: '',
        lastName: '',
      },
    }
  }
  componentDidMount() {
    apiFetch('api/account/', {
      method: 'GET',
    }).then((response) => {
      const { user } = response.data
      this.setState({
        user,
      })
    })
  }
  render() {
    const { user } = this.state
    const { classes } = this.props
    return (
      <FormSection className={classes.form}>
        <UserAvatar
          user={user}
          className={classes.avatar}
        />
        <Grid container>
          <Grid container spacing={8}>
            <Grid item xs={4} align="right">
              <Typography variant="title" color="textSecondary">{localizedStrings.name}:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="title">{user.firstName} {user.lastName}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={4} align="right">
              <Typography variant="title" color="textSecondary">{localizedStrings.email}:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="title">{user.email}</Typography>
            </Grid>
          </Grid>
          <Button
            type="button"
            size="large"
            variant="flat"
            color="secondary"
            className={classes.button}
            disabled={this.state.isLoading}
            onClick={logout}
          >
            {localizedStrings.logout}
          </Button>
        </Grid>
      </FormSection>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)

