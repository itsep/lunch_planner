/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import cuid from 'cuid'
import { fromJS } from 'immutable'
import Event from './event'

export default class Eventlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      title: 'Available events',
      summary: 'Events you can join!',
      eventTitle: '',
      eventSummary: '',
    }
  }
  render() {
    const {
      events,
      title,
      summary,
      eventTitle,
      eventSummary,
    } = this.state

    const onClickAdd = () => {
      this.setState({
        events: events.concat([{
          id: cuid(),
          title: this.state.eventTitle,
          summary: this.state.eventSummary,
        }]),
      })
    }
    const onChangeEventTitle = (change) => {
      this.setState({ eventTitle: change.target.value })
    }
    const onChangeEventSummary = (change) => {
      this.setState({ eventSummary: change.target.value })
    }
    return (
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
        <div>
          <input placeholder="Title" value={eventTitle} onChange={onChangeEventTitle} />
          <input placeholder="Summary" value={eventSummary} onChange={onChangeEventSummary} />
          <button onClick={onClickAdd} >Add Event</button>
        </div>
        <ul>
          {events.map(event =>
            <Event key={event.id} title={event.title} description={event.summary} />)}
        </ul>
      </div>
    )
  }
}
