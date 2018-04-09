/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import 'isomorphic-fetch'

export default class Ruc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registeredUserNumber: '-',
    }
    this.getRegisteredUserNumber = this.getRegisteredUserNumber.bind(this)
    this.getRegisteredUserNumber()
  }
  getRegisteredUserNumber() {
    fetch('/api/account/count')
      .then(response => response.json())
      .then(({ count }) => {
        this.setState({ registeredUserNumber: count })
      })
  }
  render() {
    const {
      registeredUserNumber,
    } = this.state
    return (
      <div>
        <h3>Registered User Counter</h3>
        <p>Registered User: <b>{registeredUserNumber}</b></p>
        <button onClick={this.getRegisteredUserNumber} >Refresh</button>
      </div>
    )
  }
}
