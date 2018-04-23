/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

export default class Ruc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registeredUserNumber: '-',
    }
    this.boundGetRegisteredUserNumber = this.getRegisteredUserNumber.bind(this)
    this.boundGetRegisteredUserNumber()
  }
  async getRegisteredUserNumber() {
    const countRes = await fetch('/api/account/count')
    const { count } = await countRes.json()
    this.setState({ registeredUserNumber: count })
    return count
  }
  render() {
    const {
      registeredUserNumber,
    } = this.state
    return (
      <Card>
        <CardContent>
          <Typography variant="title">Registered User Counter</Typography>
          <Typography>Registered User: <b>{registeredUserNumber}</b></Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.boundGetRegisteredUserNumber}>Refresh</Button>
        </CardActions>
      </Card>
    )
  }
}
