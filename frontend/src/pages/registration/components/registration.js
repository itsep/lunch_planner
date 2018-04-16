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
  registrationContainer: {
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

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: null,
    }

    this.register = this.register.bind(this)
  }
  handleChange(name) {
    const that = this
    return (event) => {
      that.setState({
        [name]: event.target.value,
      })
    }
  }
  register() {
    const { email, password } = this.state
    const data = { email, password }
    this.setState({
      isLoading: true,
      error: null,
    })
    fetch('/api/account', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
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
      <div className={classes.registrationContainer}>
        <Card className={classes.card}>
          <form className={classes.container}>
            <CardContent>
              <Typography className={classes.title} variant="title">
                Registration
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
              <Button size="large" type="submit" color="primary" onClick={this.register} disabled={this.state.isLoading}>
                Register
              </Button>
              <Fade
                in={this.state.isLoading}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Registration)

