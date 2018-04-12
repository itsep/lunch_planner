import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textField: {
    width: '100%',
  },
  actions: {
    flexDirection: 'row-reverse',
  }
})

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleChange(name) {
    const that = this
    return (event) => {
      that.setState({
        [name]: event.target.value,
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="title">
              Registration
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
            </form>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button size="large" color="primary">Register</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Registration)

