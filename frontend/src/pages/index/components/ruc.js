/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import 'isomorphic-fetch'

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
    const countRes = await fetch('http://localhost:8080/api/account/count')
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
        <CardHeader title="Registered User Counter" />
        <CardText>Registered User: <b>{registeredUserNumber}</b></CardText>
        <CardActions>
          <FlatButton label="refresh" primary onClick={this.boundGetRegisteredUserNumber} />
        </CardActions>
      </Card>
    )
  }
}
