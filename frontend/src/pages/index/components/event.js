/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'

export default class Event extends Component {
  render() {
    const {
      id,
      title,
      description,
    } = this.props
    return (
      <div id={id}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    )
  }
}
