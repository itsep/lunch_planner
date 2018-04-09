/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import 'isomorphic-fetch'

function getRegisteredUserNumber() {
  fetch('/api/account/count')
    .then(response => response.json())
    .then(({ count }) => {
      console.log(count)
      return count
    })
}

export default class Ruc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registeredUserNumber: getRegisteredUserNumber(),
    }
  }
  render() {
    const {
      registeredUserNumber,
    } = { registeredUserNumber: this.state.registeredUserNumber }
    return (
      <div>
        <h3>Registered User Counter</h3>
        <button onClick={
          () => this.setState({ registeredUserNumber: getRegisteredUserNumber() })
        }
        >Refresh
        </button>
        <p>Registered User: {registeredUserNumber}</p>
      </div>
    )
  }
}
