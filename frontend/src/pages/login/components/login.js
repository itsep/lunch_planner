import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'
import { CircularProgress } from 'material-ui/Progress'

const styles = () => ({
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  card: {
    minWidth: 275,
    maxWidth: 400,
  },
  textField: {
    width: '100%',
  },
  actions: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
})

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: null,
      loggedIn: false,
    }

    this.login = this.login.bind(this)
  }
  handleChange(name) {
    const that = this
    return (event) => {
      that.setState({
        [name]: event.target.value,
      })
    }
  }
  login() {
    const { email, password } = this.state
    const data = { email, password }
    this.setState({
      isLoading: true,
      error: null,
    })
    fetch('/api/account/login', {
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
            loggedIn: true,
          })
          return null
        }
        return response.json().then(({ error }) => { throw new Error(error) })
      })
      .catch((error) => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.loginContainer}>
        <Card className={classes.card}>
          { !this.state.loggedIn ?
            <form className={classes.container}>
              <CardContent>
                <Typography className={classes.title} variant="title">
                  Login
                </Typography>
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  className={classes.textField}
                  disabled={this.state.isLoading}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  className={classes.textField}
                  disabled={this.state.isLoading}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                />
                {this.state.error &&
                  <Typography>
                    {this.state.error.message}
                  </Typography>
                }
              </CardContent>
              <CardActions className={classes.actions}>
                <Button size="large" type="submit" color="primary" onClick={this.login} disabled={this.state.isLoading}>
                  Login
                </Button>
                <Fade
                  in={this.state.isLoading}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              </CardActions>
            </form>
          :
            <CardContent>
              <Typography variant="title" color="primary">
                {this.state.email} successful logged in.
              </Typography>
            </CardContent>
          }
        </Card>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)

