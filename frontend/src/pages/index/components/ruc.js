/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'

function getRegisteredUserNumber() {
  fetch('account/count').then(({ count }) => count)
}

export default class Ruc extends Component {
  render() {
    const {
      registeredUserNumber,
    } = { registeredUserNumber: getRegisteredUserNumber() }
    return (
      <div>
        <h3>Registered User Counter</h3>
        <button onClick={() => this.forceUpdate()} >Refresh</button>
        <p>Registered User: {registeredUserNumber}</p>
      </div>
    )
  }
}
